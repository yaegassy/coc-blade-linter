import { commands, ExtensionContext, window, workspace } from 'coc.nvim';

import fs from 'fs';
import path from 'path';

import { LintEngine } from './lint';
import { download } from './downloader';

export async function activate(context: ExtensionContext): Promise<void> {
  const extensionConfig = workspace.getConfiguration('bladeLinter');
  const isEnable = extensionConfig.get<boolean>('enable', true);
  if (!isEnable) return;

  const extensionStoragePath = context.storagePath;
  if (!fs.existsSync(extensionStoragePath)) {
    fs.mkdirSync(extensionStoragePath);
  }

  const outputChannel = window.createOutputChannel('bladeLinter');

  context.subscriptions.push(
    commands.registerCommand('bladeLinter.download', async () => {
      await downloadWrapper(context);
    })
  );

  let usePhar = true;
  // 1. bladeLinter.toolPath (phar)
  let toolPath = extensionConfig.get('toolPath', '');
  if (!toolPath) {
    // 2. Project's "laravel-blade-linter" package
    if (fs.existsSync(path.join('vendor', 'bdelespierre', 'laravel-blade-linter'))) {
      toolPath = 'dummy';
      usePhar = false;
      // 3. builtin "laravel-blade-linter" phar
    } else if (fs.existsSync(path.join(context.storagePath, 'laravel-blade-linter'))) {
      toolPath = path.join(context.storagePath, 'laravel-blade-linter');
    }
  }

  // Install "laravel-blade-linter" if it does not exist.
  if (!toolPath) {
    await downloadWrapper(context);
    if (fs.existsSync(path.join(context.storagePath, 'laravel-blade-linter'))) {
      toolPath = path.join(context.storagePath, 'laravel-blade-linter');
    }
  }

  // If "laravel-blade-linter" does not exist completely, terminate the process.
  // ----
  // If you cancel the installation.
  if (!toolPath) {
    setTimeout(() => {
      window.showErrorMessage('Exit, because "laravel-blade-linter" does not exist.');
    }, 500);
    return;
  }

  const { subscriptions } = context;
  const engine = new LintEngine(usePhar, toolPath, outputChannel);

  const onOpen = extensionConfig.get<boolean>('lintOnOpen');
  if (onOpen) {
    workspace.documents.map(async (doc) => {
      await engine.lint(doc.textDocument);
    });

    workspace.onDidOpenTextDocument(
      async (e) => {
        await engine.lint(e);
      },
      null,
      subscriptions
    );
  }

  const onSave = extensionConfig.get<boolean>('lintOnSave');
  if (onSave) {
    workspace.onDidSaveTextDocument(
      async (e) => {
        await engine.lint(e);
      },
      null,
      subscriptions
    );
  }
}

async function downloadWrapper(context: ExtensionContext) {
  let msg = 'Do you want to download "laravel-blade-linter"?';

  let ret = 0;
  ret = await window.showQuickpick(['Yes', 'Cancel'], msg);
  if (ret === 0) {
    try {
      await download(context);
    } catch (e) {
      console.error(e);
      msg =
        'Download laravel-blade-linter failed, you can get it from https://github.com/bdelespierre/laravel-blade-linter';
      window.showMessage(msg, 'error');
      return;
    }
  } else {
    return;
  }
}
