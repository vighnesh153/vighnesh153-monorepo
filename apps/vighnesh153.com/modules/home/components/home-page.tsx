import { CommonComponents } from '@modules/common';
import { useTheme } from '@mui/material';
import { homeModuleConstants } from '../constants';

export function HomePage() {
  const theme = useTheme();

  return (
    <>
      <CommonComponents.Head>
        <title>{homeModuleConstants.pageTitle}</title>
        <meta name="description" content={homeModuleConstants.pageDescription} />
      </CommonComponents.Head>

      <CommonComponents.SkipToMainContent />
      <CommonComponents.Navbar />

      <main id="main">
        <p
          style={{
            background: theme.palette.primary.main,
            height: 3500,
            paddingTop: 200,
          }}
        >
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
