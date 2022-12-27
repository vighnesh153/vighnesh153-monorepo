import { Head, Navbar, SkipToMainContent } from '@components';

export default function Home() {
  return (
    <>
      <Head>
        <title>Vighnesh Raut - the man, the myth, the living legend himself</title>
        <meta
          name="description"
          content="Vighnesh is a Software Engineer who specializes in building exceptional web
          interfaces. He also loves to dabble with Physics and Mathematics. When bored, you
          can find him watching Netflix on his bed."
        />
      </Head>

      <SkipToMainContent />

      <Navbar />

      <main id="main">
        <p style={{ background: 'red', height: 1500 }} />
      </main>
    </>
  );
}
