# Changelog

## 0.1.4

- Prefix copied references with `@`
- Normalize Windows drive letters to uppercase in copied paths

## 0.1.3

- Restore compatibility for legacy command IDs: `copyFileReference.withRange`, `copyFileReference.withFolder`, and `copyFileReference.pathOnly`

## 0.1.2

- Simplify the extension to a single copy command bound to `Alt+R`
- Always copy the absolute file path with a line number or selected range
- Show a warning for unsaved editors and non-file documents

## 0.1.1

- Support non-workspace files: falls back to `filename.ts#line` format instead of showing a warning

## 0.1.0

- Initial release
- Three copy formats: `@folder/path#line`, `path#line`, `@folder/path#startLine-endLine`
- Keyboard shortcuts, right-click context menu, and command palette support
- Automatic line range detection when selecting multiple lines
