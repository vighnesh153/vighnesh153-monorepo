import { shuffle } from '@vighnesh153/utils';
import { animals, buildCombinations, downloadImage, openaiApi } from '../utils';

const locations = ['in park', 'on grass', 'on table'];

const prompts = buildCombinations('ANIMAL playing', animals, 'ANIMAL').flatMap((s) =>
  locations.map((location) => [s, location].join(' '))
);

async function main() {
  const res = await openaiApi.createImage({
    prompt: shuffle(prompts)[0],
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
