export function removeTrailingSlashFromUrlPathName(rawUrl: string): string {
  const url = new URL(rawUrl);
  const prevP = url.pathname;
  const p = prevP.endsWith("/") ? prevP.slice(0, prevP.length - 1) : prevP;
  const updatedUrl = `${url.origin}${p}${url.hash}${url.search}`;
  return updatedUrl;
}
