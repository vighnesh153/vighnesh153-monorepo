// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { formatWrapper } from "./format_wrapper";

const toastMessage = (message: string) => {
  vscode.window.showInformationMessage(`Pika XML format: ${message}`);
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "pika-xml-parser" is now active in the web extension host!',
  );

  const xmlFormatter = vscode.languages.registerDocumentFormattingEditProvider(
    "xml",
    {
      provideDocumentFormattingEdits(
        document: vscode.TextDocument,
      ): vscode.TextEdit[] {
        const text = document.getText();
        const response = formatWrapper(text);

        if (response.type === "success") {
          return [
            vscode.TextEdit.replace(
              new vscode.Range(
                new vscode.Position(0, 0),
                new vscode.Position(text.split("\n").length + 1, 0),
              ),
              response.result,
            ),
          ];
        } else {
          toastMessage(response.errMessage);
          return [];
        }
      },
    },
  );

  context.subscriptions.push(xmlFormatter);
}

// This method is called when your extension is deactivated
export function deactivate() {
  // noop
}
