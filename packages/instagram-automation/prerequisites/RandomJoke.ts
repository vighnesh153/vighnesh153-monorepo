import nodeHtmlToImage from 'node-html-to-image';
import { openaiApi } from '../utils';

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
        background: lightpink;
        
        display: grid; 
        place-items: center;
      }
      div {
        width: 412px;
        height: 412px;
        
        display: grid; 
        place-items: center;
        
        color: black;
        background: lightpink; 
        
        font-size: 40px; 
        font-style: italic;
        font-weight: 600;
        text-align: center;
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

async function main() {
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
  await createImageWithJoke(joke);
}

main().then(() => {
  // eslint-disable-next-line no-console
  console.log('Fetched a random joke and created its image ✅');
});
