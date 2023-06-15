import { publishToInstagram } from '../helpers';

const credentials = Cypress.env('INSTAGRAM_CREDENTIALS');
if (!credentials) {
  throw new Error('Credentials not found');
}

const [username, password] = credentials.split(' ');

it('Publish random joke image to instagram', () => {
  publishToInstagram({
    username,
    password,
    filePath: 'random-joke-image.png',
    caption: '#joke #jokeoftheday #fun',
  });
});
