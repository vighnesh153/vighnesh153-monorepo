import { publishToInstagram } from '../helpers';

const credentials = Cypress.env('INSTAGRAM_CREDENTIALS');
if (!credentials) {
  throw new Error('Credentials not found');
}

const [username, password] = credentials.split(' ');

const tags = [
  '#inspiration',
  '#gottahavehighhopes',
  '#strength',
  '#Lifestyle',
  '#Luxury',
  '#motivation101',
  '#higherself',
  '#growthmindset',
  '#selflove',
  '#beagoodperson',
  '#growth',
  '#goodvibes',
  '#energy',
  '#bepositive',
  '#quotes',
];

it('Publish random quote to instagram', () => {
  publishToInstagram({
    username,
    password,
    filePath: 'random-quote-image-updated.png',
    caption: tags.join(' '),
  });
});
