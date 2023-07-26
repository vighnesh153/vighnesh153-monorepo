export function About(): JSX.Element {
  const getLink = (text: string, link: string) => {
    return (
      <a href={link} target="_blank" rel="noreferrer" style={{ fontWeight: 'bold' }}>
        {text}
      </a>
    );
  };

  return (
    <div style={{ padding: '1rem 3rem', textAlign: 'center', lineHeight: 1.5 }}>
      <h1>A Drawing App</h1>
      <p>Made with ❤️ by {getLink('Vighnesh Raut', 'https://vighnesh153.com')}</p>
      <p>
        Check out the source code on{' '}
        {getLink(
          'Github',
          'https://github.com/vighnesh153/vighnesh153-monorepo/tree/main/nodejs-tools/nodejs-apps/draw.vighnesh153.com'
        )}
      </p>
    </div>
  );
}
