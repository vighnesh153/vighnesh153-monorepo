import { publishToInstagram } from '../helpers';

const credentials = Cypress.env('INSTAGRAM_CREDENTIALS');
if (!credentials) {
  throw new Error('Credentials not found');
}

const [username, password] = credentials.split(' ');

const tags = [
  '#vocabulary',
  '#languagelearning',
  '#wordoftheday',
  '#dictionary',
  '#word',
  '#definition',
  '#language',
  '#learn',
];

it('Publish random word and its definition to instagram', () => {
  publishToInstagram({
    username,
    password,
    filePath: 'random-word-image.png',
    caption: tags.join(' '),
  });
});
