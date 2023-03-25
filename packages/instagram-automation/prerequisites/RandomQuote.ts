import axios from 'axios';
import { shuffle } from '@vighnesh153/utils';
import sharp from 'sharp';
import nodeHtmlToImage from 'node-html-to-image';
import { downloadImage, openaiApi } from '../utils';

const imagePrompts = [
  'mountain',
  'river',
  'clouds',
  'space',
  'galaxy',
  'stars',
  'city night light',
  'fall',
  'jungle monsoon',
  'abstract art',
];

interface Quote {
  a: string;
  q: string;
}

async function fetchRandomQuote(): Promise<Quote> {
  const response = await axios.get<Quote[]>('https://zenquotes.io/api/random');
  return response.data[0];
}

async function downloadRandomImage() {
  const res = await openaiApi.createImage({
    prompt: shuffle(imagePrompts)[0],
    n: 1,
    size: '512x512',
    response_format: 'url',
    user: 'vighnesh153',
  });
  const { url: imageUrl } = res.data.data[0];
  // eslint-disable-next-line no-console
  console.log(`Image URL: ${imageUrl}`);
  await downloadImage({
    url: imageUrl as string,
    filePath: './random-quote-image.png',
  }).catch((e) => {
    // eslint-disable-next-line no-console
    console.log(`Error: ${e}`);
    process.exit(0);
  });
}

async function createImageWithQuote(quoteText: string) {
  await nodeHtmlToImage({
    output: './random-quote-image-text.png',
    transparent: true,
    html: `
<html>
  <head>
    <style>
      body {
        width: 512px;
        height: 512px;
      }
      div {
        width: 512px;
        height: 512px;
        padding: 40px;
        
        display: grid; 
        place-items: center;
        
        color: white;
        background: hsla(0, 0%, 0%, 0.6); 
        
        font-size: 40px; 
        font-style: italic;
        font-weight: 600;
        text-align: center;
        text-shadow: black 0 0 10px;
      }
    </style>
  </head>
  <body>
    <div>
       ${quoteText}
    </div>
  </body>
</html>
    `,
  });
}

async function main() {
  const quote = await fetchRandomQuote();
  const quoteText = quote.q;

  await downloadRandomImage();

  await createImageWithQuote(quoteText);

  await sharp('./random-quote-image.png')
    .blur(2)
    .composite([{ input: './random-quote-image-text.png' }])
    .png()
    .toFile('./random-quote-image-updated.png');
}

main().then(() => {
  // eslint-disable-next-line no-console
  console.log('Fetched quote and wrote to an image ✅');
});
