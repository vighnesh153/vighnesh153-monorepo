export async function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}
