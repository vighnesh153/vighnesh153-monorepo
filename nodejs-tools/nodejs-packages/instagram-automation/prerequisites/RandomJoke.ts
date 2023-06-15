import nodeHtmlToImage from 'node-html-to-image';
import { shuffle } from '@vighnesh153/utils';
import { jokes, openaiApi, randomBgColor } from '../utils';

async function createImageWithJoke(joke: string) {
  await nodeHtmlToImage({
    output: './random-joke-image.png',
    transparent: true,
    html: `
<html>
  <head>
    <style>
      * {
        box-sizing: border-box;
      }
      body {
        width: 512px;
        height: 512px;
        padding: 40px;
        background: ${randomBgColor()};
        
        display: grid; 
        place-items: center;
      }
      div {
        width: 450px;
        height: 450px;
        
        display: grid; 
        place-items: center;
        
        color: black;
        
        font-size: 40px; 
        font-weight: 600;
        white-space: pre-line;
      }
    </style>
  </head>
  <body>
    <div>
       ${joke}
    </div>
  </body>
</html>
    `,
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function chatGptJoke(): Promise<string> {
  const chat = await openaiApi.createChatCompletion({
    messages: [
      {
        role: 'user',
        content: 'unique random joke',
      },
    ],
    model: 'gpt-3.5-turbo',
  });
  const joke = chat.data.choices[0].message?.content;
  if (!joke) {
    // eslint-disable-next-line no-console
    console.log('Joke is not defined');
    process.exit(1);
  }
  return joke;
}

async function main() {
  // const joke = await chatGptJoke();
  // await createImageWithJoke(joke);

  const joke = shuffle(jokes)[0];
  await createImageWithJoke([joke.setup, joke.punchline].join('\n\n'));
}

main().then(() => {
  // eslint-disable-next-line no-console
  console.log('Fetched a random joke and created its image ✅');
});
