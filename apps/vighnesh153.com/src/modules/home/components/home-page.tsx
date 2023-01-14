import { Box } from '@mui/material';
import { AsideEmailAddress, AsideSocialLinks, Head, Navbar, NavItemSection, SkipToMainContent } from '@modules/common';
import { homeModuleConstants } from '../constants';
import { AboutMeSection, ContactMeSection, ExperienceSection, FooterSection, IntroductionSection } from './sections';

const navItemSections: Array<NavItemSection> = [
  NavItemSection.About,
  NavItemSection.Blog,
  NavItemSection.Projects,
  NavItemSection.Experience,
  NavItemSection.Contact,
  NavItemSection.Resume,
  NavItemSection.ProfileAndSignIn,
];

export function HomePage() {
  return (
    <>
      <Head>
        <title>{homeModuleConstants.pageTitle}</title>
        <meta name="description" content={homeModuleConstants.pageDescription} />
      </Head>

      <SkipToMainContent />
      <Navbar navItemSections={navItemSections} />
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
