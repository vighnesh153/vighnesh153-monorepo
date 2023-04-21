import fetch, { Request, Response } from 'node-fetch';

const prefix = 'https://raw.githubusercontent.com/vighnesh153/open-dictionary/main/data';
const suffix = '_.json';

// export interface Env {}

function buildResponse(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
    status,
  });
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const word = url.searchParams.get('word');

    if (word === null) {
      return buildResponse({ message: `Please provide word using the "?word=<YOUR-WORD>" format` }, 400);
    }

    const definitionUrl = [prefix, ...word.split(''), suffix].join('/');
    const definitionText = await fetch(definitionUrl).then((res) => res.text());

    if (definitionText === '404: Not Found') {
      return buildResponse(
        {
          message: `Word "${word}" not found.`,
          searchUrl: definitionUrl,
        },
        404
      );
    }
    const definition = JSON.parse(definitionText);
    return buildResponse(definition, 200);
  },
};
