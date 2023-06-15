import { publishToInstagram } from '../helpers';

const credentials = Cypress.env('INSTAGRAM_CREDENTIALS');
if (!credentials) {
  throw new Error('Credentials not found');
}

const [username, password] = credentials.split(' ');

it('Publish random animal image to instagram', () => {
  publishToInstagram({
    username,
    password,
    filePath: 'random-animal-image.png',
    caption: '#animal #playing #fun #photography',
  });
});
