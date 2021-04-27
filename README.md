# coc-blade-linter

<!-- markdownlint-disable-next-line -->
[Laravel Blade Linter](https://github.com/bdelespierre/laravel-blade-linter) extension for [coc.nvim](https://github.com/neoclide/coc.nvim)

Performs syntax-checks of your Blade templates. Just that.

<!-- markdownlint-disable-next-line -->
<img width="780" alt="coc-blade-linter-demo" src="https://user-images.githubusercontent.com/188642/114817122-68c11f00-9df4-11eb-8405-ba63f12e8821.gif">

## Features

- Lint by [laravel-blade-linter](https://github.com/bdelespierre/laravel-blade-linter)
- Downloader (laravel-blade-linter tool) | [DEMO](https://github.com/yaegassy/coc-blade-linter/pull/1)

## Install

**CocInstall**:

```vim
:CocInstall coc-blade-linter
```

**vim-plug**:

```vim
Plug 'yaegassy/coc-blade-linter', {'do': 'yarn install --frozen-lockfile'}
```

## Detects: "laravel-blade-linter" tool

Detects the `laravel-blade-linter`. They are prioritized in order from the top.

1. `bladeLinter.toolPath`
1. `vendor/bdelespierre/laravel-blade-linter` package. (`composer require --dev bdelespierre/laravel-blade-linter`)
1. `laravel-blade-linter` retrieved by the download feature. (`:CocCommand bladeLinter.download`)
    - Mac/Linux: `~/.config/coc/extensions/coc-blade-linter-data/laravel-blade-linter`
    - Windows: `~/AppData/Local/coc/extensions/coc-blade-linter-data/laravel-blade-linter`

## Filetype

The "filetype" must be `blade` for this extension to work.

<!-- markdownlint-disable-next-line -->
Set up `autocmd BufNewFile,BufRead *.blade.php set filetype=blade` in `.vimrc/init.vim`, Or install "blade" related plugin (e.g. [jwalton512/vim-blade](https://github.com/jwalton512/vim-blade) or [sheerun/vim-polyglot](https://github.com/sheerun/vim-polyglot)).

## Configuration options

- `bladeLinter.enable`: Enable coc-blade-linter extension, default: `true`
- `bladeLinter.toolPath`: The path to the laravel-blade-linter phar file (Absolute path), default: `""`
- `bladeLinter.lintOnOpen`: Lint blade file on opening, default: `true`
- `bladeLinter.lintOnSave`: Lint blade file on save, default: `true`

## Commands

- `bladeLinter.download`: Download laravel-blade-linter

## Related coc.nvim extension

- [yaegassy/coc-blade-formatter](https://github.com/yaegassy/coc-blade-formatter)

## Thanks

- [bdelespierre/laravel-blade-linter](https://github.com/bdelespierre/laravel-blade-linter)

## License

MIT

----

> This extension is built with [create-coc-extension](https://github.com/fannheyward/create-coc-extension)
