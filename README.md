# coc-blade-linter

<!-- markdownlint-disable-next-line -->
[Laravel Blade Linter](https://github.com/bdelespierre/laravel-blade-linter) extension for [coc.nvim](https://github.com/neoclide/coc.nvim)

Performs syntax-checks of your Blade templates. Just that.

<!-- markdownlint-disable-next-line -->
<img width="780" alt="coc-blade-linter-demo" src="https://user-images.githubusercontent.com/188642/114817122-68c11f00-9df4-11eb-8405-ba63f12e8821.gif">

## Features

- Lint by [laravel-blade-linter](https://github.com/bdelespierre/laravel-blade-linter)

## Install

**CocInstall**:

> TODO

**vim-plug**:

```vim
Plug 'yaegassy/coc-blade-linter', {'do': 'yarn install --frozen-lockfile'}
```

## Require

Install `bdelespierre/laravel-blade-linter` in your "laravel" project.

```sh
composer require --dev bdelespierre/laravel-blade-linter
```

If you **do not have "laravel-blade-linter" installed**, the extension will be `disabled`.

----

The "filetype" must be `blade` for this extension to work.

<!-- markdownlint-disable-next-line -->
Set up `autocmd BufNewFile,BufRead *.blade.php set filetype=blade` in `.vimrc/init.vim`, Or install "blade" related plugin (e.g. [jwalton512/vim-blade](https://github.com/jwalton512/vim-blade) or [sheerun/vim-polyglot](https://github.com/sheerun/vim-polyglot)).

## Configuration options

- `bladeLinter.enable`: Enable coc-blade-linter extension, default: `true`
- `bladeLinter.lintOnOpen`: Lint blade file on opening, default: `true`
- `bladeLinter.lintOnChange`: Lint blade file on change, default: `true`
- `bladeLinter.lintOnSave`: Lint blade file on save, default: `true`

## Related coc.nvim extension

- [yaegassy/coc-blade-formatter](https://github.com/yaegassy/coc-blade-formatter)

## WIP(Plan?)

<!-- markdownlint-disable-next-line -->
- Integrate `coc-blade-linter`, `coc-blade-formatter` and VSCode's [Laravel Snippets](hjttps://github.com/onecentlin/laravel5-snippets-vscode) into an extension called `coc-laravel-blade`?

## Thanks

- [bdelespierre/laravel-blade-linter](https://github.com/bdelespierre/laravel-blade-linter)

## License

MIT

----

> This extension is built with [create-coc-extension](https://github.com/fannheyward/create-coc-extension)
