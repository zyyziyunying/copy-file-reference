# Copy File Reference

Quickly copy file path with line number to clipboard in various formats. Perfect for code reviews, documentation, and team communication.

## Features

Three copy formats available via keyboard shortcuts, command palette, or right-click context menu:

| Format                   | Example                          | Shortcut     |
| ------------------------ | -------------------------------- | ------------ |
| `@folder/path#line`      | `@my-project/src/index.ts#42`    | `Alt+K`      |
| `path#line`              | `src/index.ts#42`                | `Ctrl+Alt+C` |
| `@folder/path#start-end` | `@my-project/src/index.ts#10-20` | `Alt+R`      |

> On macOS, use `Cmd` instead of `Ctrl`.

When multiple lines are selected, all formats automatically show the line range (e.g. `#10-20`).

## Usage

### Keyboard Shortcuts

1. Place your cursor on a line, or select multiple lines
2. Press the shortcut for your desired format

### Right-Click Menu

1. Right-click in the editor
2. Select **Copy File Reference** from the context menu
3. Choose your desired format

### Command Palette

1. Press `Ctrl+Shift+P` (`Cmd+Shift+P` on macOS)
2. Type "Copy Reference"
3. Select the format you want

## Examples

Single line:

```
@my-app/src/utils/helper.ts#66
src/utils/helper.ts#66
```

Multiple lines selected:

```
@my-app/src/utils/helper.ts#60-66
src/utils/helper.ts#60-66
```

## Requirements

- Works best inside a VS Code workspace folder.
- For files outside a workspace, falls back to `filename.ts#line` format.

## License

MIT
