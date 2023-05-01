import { Box, Typography, useTheme } from '@mui/material';
import { FocusDashedOutline, SocialLinks } from '@/modules/common';
import { homeModuleConstants } from '../../constants';

const footerSection = homeModuleConstants.sections.footer;

export function FooterSection() {
  const theme = useTheme();
  const textColor = theme.palette.text.secondary;
  return (
    <FocusDashedOutline
      id="footer"
      className="footer"
      component="footer"
      sx={{ mt: 15, mb: 5, display: 'grid', placeItems: 'center' }}
    >
      <Box
        component="ul"
        sx={{
          mb: 2,

          display: {
            xs: 'flex',
            sm: 'none',
          },
          gap: '1.5rem',

          fontSize: 0,
          listStyle: 'none',
        }}
      >
        <SocialLinks placement="top" />
      </Box>

      <Typography variant="subtitle2" color={textColor} textAlign="center" sx={{ maxWidth: 200 }}>
        {footerSection.summary}
      </Typography>
    </FocusDashedOutline>
  );
}
