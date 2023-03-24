import { publishToInstagram } from '../helpers';

const credentials = process.env.INSTAGRAM_CREDENTIALS;
if (!credentials) {
  throw new Error('Credentials not found');
}

const [username, password] = credentials.split(' ');

it('Publish AI image to instagram', () => {
  publishToInstagram({
    username,
    password,
    filePath: 'open-ai-image.png',
  });
});
