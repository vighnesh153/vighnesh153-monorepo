import { shuffle } from '@vighnesh153/utils';
import { animals, buildCombinations, downloadImage, openaiApi, pokemon, superHeroes } from '../utils';

// Development url
// const imageUrl = 'https://i.imgur.com/1XbZ92c.png';

const prompts = [
  'Random abstract art',
  'fractal',
  ...buildCombinations(
    'Portrait of a REPLACE_KEY next to a capybara, in the style of a Frida Kahlo painting',
    ['boy', 'girl'],
    'REPLACE_KEY'
  ),
  ...buildCombinations('REPLACE_KEY with a cowboy hat, in the style of Rene Magritte', ['Man', 'Woman'], 'REPLACE_KEY'),
  ...buildCombinations(
    'A REPLACE_KEY with red hair in the style of Tamara de Lempicka',
    ['man', 'woman'],
    'REPLACE_KEY'
  ),
  ...buildCombinations('POKEMON, cinematic, digital art', pokemon, 'POKEMON'),
  ...buildCombinations('SUPER_HERO, cinematic lighting, high resolution 3D render', superHeroes, 'SUPER_HERO'),
  'Storm trooper in the desert, high-detail, dramatic lighting, digital art',
  'Ukiyo-e print of two women visiting a shrine',
  'Cyberpunk style city street at night, unreal engine 5',
  'Oil painting of a cottage near a pond, spring time',
  ...buildCombinations('Portrait of a Siamese ANIMAL wearing a robe, Chinese watercolor painting', animals, 'ANIMAL'),
  'Portrait of a smiling cyborg woman, peaceful, digital art',
  'Victorian era portrait of an old man wearing a hat, photorealistic',
  'Cottage overgrown with ancient trees, high-fantasy, digital art',
  'Medieval German castle, surrounded by mountains, high fantasy, epic, digital art',
  'Snail house on top of a cliff, surreal, fantasy, digital art',
];

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
