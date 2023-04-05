import { shuffle } from '@vighnesh153/utils';
import { downloadImage, openaiApi } from '../utils';

const location = ['in park', 'on grass', 'on table'];

async function main() {
  const res = await openaiApi.createImage({
    prompt: ['random animal playing', shuffle(location)[0]].join(' '),
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
    filePath: './random-animal-image.png',
  }).catch((e) => {
    // eslint-disable-next-line no-console
    console.log(`Error: ${e}`);
    process.exit(0);
  });
}

main().then(() => {
  // eslint-disable-next-line no-console
  console.log('Downloading of random image of an animal is complete ✅');
});
