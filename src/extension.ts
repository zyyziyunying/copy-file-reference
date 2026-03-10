import * as vscode from "vscode";

function getLineInfo(editor: vscode.TextEditor): {
  start: number;
  end: number;
  isRange: boolean;
} {
  const selection = editor.selection;
  const start = selection.start.line + 1;
  const end = selection.end.line + 1;
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

function normalizeAbsolutePath(fsPath: string): string {
  const normalizedPath = fsPath.replace(/\\/g, "/");

  if (/^[a-z]:\//.test(normalizedPath)) {
    return normalizedPath[0].toUpperCase() + normalizedPath.slice(1);
  }

  return normalizedPath;
}

function buildReference(editor: vscode.TextEditor): string {
  const fileUri = editor.document.uri;
  const lineInfo = getLineInfo(editor);
  const line = lineInfo.isRange
    ? `${lineInfo.start}-${lineInfo.end}`
    : `${lineInfo.start}`;
  const fullPath = normalizeAbsolutePath(fileUri.fsPath);
  return `@${fullPath}#${line}`;
}

export function activate(context: vscode.ExtensionContext) {
  const commandIds = [
    "copyFileReference.copy",
    "copyFileReference.withRange",
    "copyFileReference.withFolder",
    "copyFileReference.pathOnly",
  ];

  const runCopyCommand = () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage("No active editor");
      return;
    }

    if (editor.document.uri.scheme !== "file" || !editor.document.uri.fsPath) {
      vscode.window.showWarningMessage(
        "Only saved local files can be copied as file references",
      );
      return;
    }

    copyToClipboard(buildReference(editor));
  };

  const disposables = commandIds.map((commandId) =>
    vscode.commands.registerCommand(commandId, runCopyCommand),
  );

  context.subscriptions.push(...disposables);
}

export function deactivate() {}
