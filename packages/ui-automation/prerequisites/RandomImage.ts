import { OpenAIApi } from 'openai';
import { downloadImage } from '../utils';

const openai = new OpenAIApi({
  apiKey: process.env.OPEN_AI_API_KEY,
  isJsonMime(mime: string): boolean {
    return mime.includes('json');
  },
});

// Development url
// const imageUrl = 'https://i.imgur.com/1XbZ92c.png';

async function main() {
  const res = await openai.createImage({
    prompt: '',
    n: 1,
    size: '512x512',
    response_format: 'url',
    user: 'vighnesh153',
  });
  const { url: imageUrl } = res.data.data[0];
  // eslint-disable-next-line no-console
  console.log(`Image URL: ${imageUrl}`);
  await downloadImage(imageUrl as string, './open-ai-image.png');
}

main().then(() => {
  // eslint-disable-next-line no-console
  console.log('Downloading of image complete ✅');
});
