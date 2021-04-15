import { ExtensionContext, window, workspace } from 'coc.nvim';

import fs from 'fs';
import path from 'path';

import { LintEngine } from './lint';

export async function activate(context: ExtensionContext): Promise<void> {
  const extensionConfig = workspace.getConfiguration('bladeLinter');
  const isEnable = extensionConfig.get<boolean>('enable', true);
  if (!isEnable) return;

  const outputChannel = window.createOutputChannel('bladeLinter');

  if (!fs.existsSync(path.join('vendor', 'bdelespierre', 'laravel-blade-linter'))) {
    outputChannel.appendLine(`${'#'.repeat(10)} bladeLinter\n`);
    outputChannel.append('Disable the extension because "laravel-blade-linter" is not installed');
    return;
  }

  const { subscriptions } = context;
  const engine = new LintEngine(outputChannel);

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

  const onChange = extensionConfig.get<boolean>('lintOnChange');
  if (onChange) {
    workspace.onDidChangeTextDocument(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_e) => {
        const doc = await workspace.document;
        await engine.lint(doc.textDocument);
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
