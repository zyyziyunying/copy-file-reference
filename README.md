# Copy File Reference

English | [简体中文](README.zh-CN.md)

Quickly copy an `@`-prefixed absolute file path with line number to the clipboard. Perfect for code reviews, documentation, and team communication.

## Features

One command is available via keyboard shortcut, command palette, or right-click context menu:

| Output | Shortcut |
| ------ | -------- |
| `@D:/dev/project/src/index.ts#42` | `Alt+R` |

When multiple lines are selected, the command automatically shows the line range (for example `#10-20`).

The extension always copies the absolute file path with a leading `@`, and normalizes Windows drive letters to uppercase.

## Usage

### Keyboard Shortcuts

1. Place your cursor on a line, or select multiple lines
2. Press `Alt+R`

### Right-Click Menu

1. Right-click in the editor
2. Select **Copy File Reference**

### Command Palette

1. Press `Ctrl+Shift+P` (`Cmd+Shift+P` on macOS)
2. Type "Copy File Reference"
3. Run the command

## Examples

Single line:

```
@D:/dev/my-app/src/utils/helper.ts#66
```

Multiple lines selected:

```
@D:/dev/my-app/src/utils/helper.ts#60-66
```

## Requirements

- Supports saved local files in VS Code.
- Unsaved editors and non-file documents are not supported.

## License

MIT
