import { Box, Typography, useTheme } from '@mui/material';
import { BorderCornerAnimationLink, commonConstants, FocusDashedOutline } from '@/modules/common';
import { homeModuleConstants } from '@/modules/home/constants';

const contactMeSection = homeModuleConstants.sections.contactMe;

export function ContactMeSection() {
  const theme = useTheme();
  const textColor = theme.palette.text.secondary;
  return (
    <Box id="contact" className="contact-me" component="section" sx={{ py: 12.5 }}>
      <FocusDashedOutline>
        <Typography color="secondary" variant="subtitle1" textAlign="center">
          {contactMeSection.count}. {contactMeSection.caption}
        </Typography>
        <Typography component="h2" variant="h4" fontWeight="bold" textAlign="center" sx={{ mt: 1 }}>
          {contactMeSection.title}
        </Typography>
        <Typography color={textColor} textAlign="center" sx={{ mt: 1, mx: 'auto', maxWidth: 600 }}>
          {contactMeSection.summary}
        </Typography>
        <Box sx={{ mt: 3, display: 'grid', placeItems: 'center' }}>
          <BorderCornerAnimationLink href={`mailto:${commonConstants.email.personal.secondary}`}>
            Say Hello
          </BorderCornerAnimationLink>
        </Box>
      </FocusDashedOutline>
    </Box>
  );
}
