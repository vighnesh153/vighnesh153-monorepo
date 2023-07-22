export const bugReporter = {
  getErrorString: (code: string): string =>
    `LANGUAGE BUG: ${code}. ` + 'Please do report this to me along with your source code.',
  report: (code: string): void => {
    throw new Error(bugReporter.getErrorString(code));
  },
};
