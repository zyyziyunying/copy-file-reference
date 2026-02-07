# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A VS Code extension that copies file path + line number references to the clipboard in various formats (e.g. `@folder/path#line`, `path#line`, `path#start-end`). Used for code reviews, documentation, and team communication.

## Build Commands

- `npm run compile` — Compile TypeScript to `out/`
- `npm run watch` — Compile in watch mode
- `npm run vscode:prepublish` — Pre-publish build (runs compile)

There are no tests or linting configured.

## Packaging

Package the extension with `vsce package`. A `.vscodeignore` excludes `src/`, `node_modules/`, `.gitignore`, and `tsconfig.json` from the VSIX.

## Architecture

Single-file extension: all logic lives in `src/extension.ts`.

- **`activate()`** — Registers three commands (`copyFileReference.withFolder`, `copyFileReference.pathOnly`, `copyFileReference.withRange`) that each call `buildReference()` with a different mode, then copy the result to clipboard.
- **`buildReference()`** — Resolves the active editor's file URI to a workspace-relative path, gets line/range info from the selection, and formats the reference string based on mode.
- **Helper functions**: `getWorkspaceFolder`, `getRelativePath`, `getFolderName`, `getLineInfo`, `copyToClipboard`.

Commands, keybindings, and context menus are declared in `package.json` under `contributes`. The extension uses a submenu (`copyFileReference.submenu`) in the editor right-click context menu.

## Notes

- Warning messages are in Chinese (e.g. "当前文件不在工作区内，无法生成引用路径").
- The `withFolder` and `withRange` modes currently produce identical output — both format as `@folder/path#line` with automatic range detection.
- Target: VS Code ^1.80.0, TypeScript ES2020, CommonJS modules.
