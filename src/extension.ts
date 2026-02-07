import * as vscode from "vscode";
import * as path from "path";

function getWorkspaceFolder(
  fileUri: vscode.Uri,
): vscode.WorkspaceFolder | undefined {
  return vscode.workspace.getWorkspaceFolder(fileUri);
}

function getRelativePath(
  fileUri: vscode.Uri,
  workspaceFolder: vscode.WorkspaceFolder,
): string {
  return path
    .relative(workspaceFolder.uri.fsPath, fileUri.fsPath)
    .replace(/\\/g, "/");
}

function getFolderName(workspaceFolder: vscode.WorkspaceFolder): string {
  return path.basename(workspaceFolder.uri.fsPath);
}

function getLineInfo(editor: vscode.TextEditor): {
  start: number;
  end: number;
  isRange: boolean;
} {
  const selection = editor.selection;
  const start = selection.start.line + 1;
  const end = selection.end.line + 1;
  // 如果选中区域的 end 在行首（character === 0），且不是同一行，则取上一行
  const adjustedEnd =
    selection.end.character === 0 && end > start ? end - 1 : end;
  return {
    start,
    end: adjustedEnd,
    isRange: adjustedEnd > start,
  };
}

async function copyToClipboard(text: string) {
  await vscode.env.clipboard.writeText(text);
  vscode.window.showInformationMessage(`Copied: ${text}`);
}

function buildReference(
  editor: vscode.TextEditor,
  mode: "withFolder" | "pathOnly" | "withRange",
): string | undefined {
  const fileUri = editor.document.uri;
  const workspaceFolder = getWorkspaceFolder(fileUri);

  if (!workspaceFolder) {
    vscode.window.showWarningMessage("当前文件不在工作区内，无法生成引用路径");
    return undefined;
  }

  const relativePath = getRelativePath(fileUri, workspaceFolder);
  const folderName = getFolderName(workspaceFolder);
  const lineInfo = getLineInfo(editor);

  switch (mode) {
    case "withFolder": {
      const line = lineInfo.isRange
        ? `${lineInfo.start}-${lineInfo.end}`
        : `${lineInfo.start}`;
      return `@${folderName}/${relativePath}#${line}`;
    }
    case "pathOnly": {
      const line = lineInfo.isRange
        ? `${lineInfo.start}-${lineInfo.end}`
        : `${lineInfo.start}`;
      return `${relativePath}#${line}`;
    }
    case "withRange": {
      const line = lineInfo.isRange
        ? `${lineInfo.start}-${lineInfo.end}`
        : `${lineInfo.start}`;
      return `@${folderName}/${relativePath}#${line}`;
    }
  }
}

export function activate(context: vscode.ExtensionContext) {
  const commands: Array<{
    id: string;
    mode: "withFolder" | "pathOnly" | "withRange";
  }> = [
    { id: "copyFileReference.withFolder", mode: "withFolder" },
    { id: "copyFileReference.pathOnly", mode: "pathOnly" },
    { id: "copyFileReference.withRange", mode: "withRange" },
  ];

  for (const { id, mode } of commands) {
    const disposable = vscode.commands.registerCommand(id, () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage("没有打开的编辑器");
        return;
      }
      const ref = buildReference(editor, mode);
      if (ref) {
        copyToClipboard(ref);
      }
    });
    context.subscriptions.push(disposable);
  }
}

export function deactivate() {}
