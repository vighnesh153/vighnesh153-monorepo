import { Box } from '@mui/material';
import { AsideEmailAddress, AsideSocialLinks, Head, Navbar, SkipToMainContent } from '@modules/common';
import { homeModuleConstants } from '../constants';
import { IntroductionSection, AboutMeSection, ExperienceSection, ContactMeSection, FooterSection } from './sections';

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

        <FooterSection />
      </Box>
    </>
  );
}
