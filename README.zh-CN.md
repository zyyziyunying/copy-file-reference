# Copy File Reference

[English](README.md) | 简体中文

快速将带 `@` 前缀和行号的绝对文件路径复制到剪贴板。适合用于代码评审、文档记录和团队沟通。

## 功能

提供 1 个命令，可通过快捷键、命令面板或右键菜单使用：

| 输出 | 快捷键 |
| ---- | ------ |
| `@D:/dev/project/src/index.ts#42` | `Alt+R` |

当选中多行时，命令会自动输出行范围（例如 `#10-20`）。

扩展始终复制带 `@` 前缀的绝对路径，并在 Windows 上将盘符统一标准化为大写。

## 使用方式

### 键盘快捷键

1. 将光标放在某一行，或选中多行
2. 按下 `Alt+R`

### 右键菜单

1. 在编辑器中右键
2. 选择 **Copy File Reference**

### 命令面板

1. 按 `Ctrl+Shift+P`（macOS 上为 `Cmd+Shift+P`）
2. 输入 "Copy File Reference"
3. 运行命令

## 示例

单行：

```
@D:/dev/my-app/src/utils/helper.ts#66
```

选中多行：

```
@D:/dev/my-app/src/utils/helper.ts#60-66
```

## 要求

- 支持 VS Code 中已保存的本地文件。
- 未保存编辑器和非文件类型文档不支持此命令。

## 许可证

MIT
