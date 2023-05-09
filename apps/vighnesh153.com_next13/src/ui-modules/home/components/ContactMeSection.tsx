import { Box, Typography, useTheme } from '@mui/material';
import { BorderCornerAnimationLink, FocusDashedOutline } from '@/ui-modules/common/components';
import { commonModuleConstants } from '@/ui-modules/common/constants';

export function ContactMeSection() {
  const theme = useTheme();
  const textColor = theme.palette.text.secondary;
  return (
    <Box id="contact" className="contact-me" component="section" sx={{ py: 12.5 }}>
      <FocusDashedOutline>
        <Typography
          color="secondary"
          sx={{
            typography: {
              sm: 'subtitle1',
              md: 'body1',
            },
          }}
          textAlign="center"
        >
          {`04. What's next?`}
        </Typography>
        <Typography component="h2" variant="h4" fontWeight="bold" textAlign="center" sx={{ mt: 1 }}>
          Get In Touch
        </Typography>
        <Typography
          color={textColor}
          textAlign="center"
          sx={{
            mt: 1,
            mx: 'auto',
            maxWidth: 600,
            typography: {
              sm: 'body1',
              md: 'h6',
            },
          }}
        >
          My inbox is always open, whether you have a question or just to say hi. I will try my best to get back to you.
        </Typography>
        <Box sx={{ mt: 3, display: 'grid', placeItems: 'center' }}>
          <BorderCornerAnimationLink href={`mailto:${commonModuleConstants.email.personal.secondary}`}>
            Say Hello
          </BorderCornerAnimationLink>
        </Box>
      </FocusDashedOutline>
    </Box>
  );
}
