import axios from 'axios';
import nodeHtmlToImage from 'node-html-to-image';

interface RandomWord {
  definition: string;
  word: string;
}

interface Response {
  list: Array<RandomWord>;
}

async function fetchRandomWords(): Promise<Array<RandomWord>> {
  const res = await axios.get<Response>('https://api.urbandictionary.com/v0/random');
  return res.data.list.map(({ word, definition }) => ({ word, definition }));
}

async function findRandomWordAccordingToSpecs(): Promise<RandomWord> {
  // todo: remove this block
  if (Math.random() < 0) {
    return {
      word: 'Fecalphilia',
      definition: 'Fecalphiliacs have an [insatiable] [appetite] [for shit].',
    };
  }
  let randomWord: RandomWord | null = null;
  do {
    // eslint-disable-next-line no-await-in-loop
    const randomWords = await fetchRandomWords();
    randomWord = randomWords.find((word) => word.definition.split(' ').length < 20) ?? null;
  } while (randomWord === null);
  return randomWord;
}

async function createImageWithRandomWord({ word, definition }: RandomWord) {
  await nodeHtmlToImage({
    output: './random-word-image.png',
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
      }
      div {
        width: 512px;
        height: 512px;
        padding: 40px;
        
        color: black;
        background: lightpink; 
      }
      p {
        margin: 0;
      }
      .word {
        margin-top: 40px;
        font-size: 40px; 
        font-style: italic;
        font-weight: 600;
      }
      .definition {
        margin-top: 40px;
        font-size: 24px;
      }
    </style>
  </head>
  <body>
    <div>
      <p class="word">${word}</p>
      <p class="definition">${definition}</p>
    </div>
  </body>
</html>
    `,
  });
}

async function main() {
  const randomWord = await findRandomWordAccordingToSpecs();
  await createImageWithRandomWord(randomWord);
}

main().then(() => {
  // eslint-disable-next-line no-console
  console.log('Fetched the random word and its meaning ✅');
});
