// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "pika-xml-parser" is now active in the web extension host!');

  const toastMessage = (message: string) => {
    vscode.window.showInformationMessage(`Pika XML format: ${message}`);
  };

  const formatCurrentFile = vscode.commands.registerCommand('pika-xml-parser.formatCurrentFile', async () => {
    // The code you place here will be executed every time your command is executed

    const activeEditor = vscode.window.activeTextEditor;

    if (!activeEditor) {
      toastMessage('No XML file is open');
      return;
    }

    if (!activeEditor.document.fileName.toLowerCase().endsWith('.xml')) {
      toastMessage('Current file is not an XML file');
      return;
    }

    toastMessage(`Formatting file: ${activeEditor.document.fileName}`);

    const text = activeEditor.document.getText();

    await activeEditor.edit((editBuilder) => {
      editBuilder.replace(
        new vscode.Range(new vscode.Position(0, 0), new vscode.Position(text.split('\n').length + 1, 0)),
        'Infernape\n'
      );
    });
    await activeEditor.document.save();
  });

  context.subscriptions.push(formatCurrentFile);
}

// This method is called when your extension is deactivated
export function deactivate() {
  // noop
}
