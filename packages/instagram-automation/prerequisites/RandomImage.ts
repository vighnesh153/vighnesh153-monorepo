import { downloadImage, openaiApi } from '../utils';

// Development url
// const imageUrl = 'https://i.imgur.com/1XbZ92c.png';

async function main() {
  const res = await openaiApi.createImage({
    prompt: 'Random abstract art',
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
    filePath: './open-ai-image.png',
  }).catch((e) => {
    // eslint-disable-next-line no-console
    console.log(`Error: ${e}`);
    process.exit(0);
  });
}

main().then(() => {
  // eslint-disable-next-line no-console
  console.log('Downloading of image complete ✅');
});
