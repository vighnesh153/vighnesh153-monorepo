import { publishToInstagram } from '../helpers';

function credentialsNotFound(): string[] {
  throw new Error('Credentials not found');
}

const [username, password] = process.env.INSTAGRAM_CREDENTIALS?.split(' ') ?? credentialsNotFound();

it('Publish AI image to instagram', () => {
  publishToInstagram({
    username,
    password,
    filePath: 'open-ai-image.png',
  });
});
