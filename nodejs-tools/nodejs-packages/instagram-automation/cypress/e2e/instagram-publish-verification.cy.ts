import { publishToInstagram } from '../helpers';

const credentials = Cypress.env('INSTAGRAM_CREDENTIALS');
if (!credentials) {
  throw new Error('Credentials not found');
}

const [username, password] = credentials.split(' ');

it('Publish a sample image to instagram', () => {
  publishToInstagram({
    username,
    password,
    filePath: 'sample.png',
    caption: '#sample #test #api #automation',
  });
});
