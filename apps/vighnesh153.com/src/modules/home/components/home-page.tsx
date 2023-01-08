import { AsideEmailAddress, AsideSocialLinks, Head, Navbar, SkipToMainContent } from '@modules/common';
import { Box } from '@mui/material';
import { homeModuleConstants } from '../constants';
import { IntroductionSection, AboutMeSection, ExperienceSection, ContactMeSection } from './sections';

export function HomePage() {
  return (
    <>
      <Head>
        <title>{homeModuleConstants.pageTitle}</title>
        <meta name="description" content={homeModuleConstants.pageDescription} />
      </Head>

      <SkipToMainContent />
      <Navbar />
      <AsideSocialLinks />
      <AsideEmailAddress />

      <Box component="main" sx={{ px: '2rem' }}>
        <Box
          sx={{
            mx: 'auto',
            px: {
              sm: '2rem',
              md: '4rem',
            },
            maxWidth: 1200,
          }}
        >
          <IntroductionSection />
          <AboutMeSection />
          <ExperienceSection />
          <ContactMeSection />
        </Box>

        {/* <iframe */}
        {/*  title="my resume" */}
        {/*  src="https://drive.google.com/file/d/1u_8oDHemUAYZdO99AGEYX8iqRrl3lNGO/preview" */}
        {/*  width="300" */}
        {/*  // height="480" */}
        {/*  style={{ aspectRatio: '1/1.270' }} */}
        {/*  allow="autoplay" */}
        {/* /> */}
      </Box>
    </>
  );
}
