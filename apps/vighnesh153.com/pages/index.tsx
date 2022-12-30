import { Components } from '@modules/common';
import { useTheme } from '@mui/material';

export default function Home() {
  const theme = useTheme();
  return (
    <>
      <Components.Head>
        <title>Vighnesh Raut - the man, the myth, the living legend himself</title>
        <meta
          name="description"
          content="Vighnesh is a Software Engineer who specializes in building exceptional web
          interfaces. He also loves to dabble with Physics and Mathematics. When bored, you
          can find him watching Netflix on his bed."
        />
      </Components.Head>

      <Components.SkipToMainContent />

      <Components.Navbar />

      <main id="main">
        <p style={{ background: theme.palette.primary.main, height: 3500, paddingTop: 200 }}>
          {/* <iframe */}
          {/*  title="my resume" */}
          {/*  src="https://drive.google.com/file/d/1u_8oDHemUAYZdO99AGEYX8iqRrl3lNGO/preview" */}
          {/*  width="300" */}
          {/*  // height="480" */}
          {/*  style={{ aspectRatio: '1/1.270' }} */}
          {/*  allow="autoplay" */}
          {/* /> */}
        </p>
      </main>
    </>
  );
}
