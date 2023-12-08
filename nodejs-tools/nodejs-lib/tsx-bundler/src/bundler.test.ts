// @vitest-environment node

import { JSDOM } from 'jsdom';
import { sleep } from '@vighnesh153/utils';

import { bundle } from './bundler';
import { starterCode } from './constants';

const buildHtmlCode = (bundledCode: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>
    <div id="root"></div>
    <script type="application/javascript">
        function handleError(error) {
          document.body.innerHTML = \`
            <div style="color: red; padding: 1rem">
              \${error.message}
            </div>
          \`;
        }

        try {
          ${bundledCode};
        } catch (e) {
          handleError(e);
        }
    </script>
</body>
</html>
`;

test(
  'should bundle the code',
  async () => {
    const result = await bundle(starterCode);

    assert(result.status === 'success');
    expect(result.status).toBe('success');

    const bundledCode = result.outputCode;

    const dom = new JSDOM(buildHtmlCode(bundledCode), { runScripts: 'dangerously' });

    await sleep(4000);

    const output = dom.window.document.querySelector('#root')?.innerHTML;

    expect(output).toMatchInlineSnapshot(
      // eslint-disable-next-line max-len
      '"<div><h1>Pikachu supremacy ✌️ ϞϞ(๑⚈ ․̫ ⚈๑)∩ ⚡️⚡️</h1><p>Is 42 Prime: <strong>false</strong></p><p>Is 43 Prime: <strong>true</strong></p><h2>Users</h2><p>User count: 10</p></div>"'
    );
  },
  {
    timeout: 60_000,
  }
);
