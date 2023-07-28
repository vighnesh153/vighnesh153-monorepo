export function Header(): JSX.Element {
  return (
    <header
      style={{
        height: `var(--header-height)`,
        padding: '0.5rem 1rem',
        position: 'sticky',
        top: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: 10, // to be over code-mirror
      }}
    >
      <span style={{ fontSize: '1.3em' }}>A Typescript and React playground</span>
      <span>Built with ❤️ by Vighnesh Raut</span>
    </header>
  );
}
