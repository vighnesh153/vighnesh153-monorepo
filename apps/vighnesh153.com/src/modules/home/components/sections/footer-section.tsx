import { Box, Typography, useTheme } from '@mui/material';
import { homeModuleConstants } from '@modules/home/constants';

const footerSection = homeModuleConstants.sections.footer;

export function FooterSection() {
  const theme = useTheme();
  const textColor = theme.palette.text.secondary;
  return (
    <Box
      id="footer"
      className="footer"
      component="footer"
      sx={{ mt: 15, mb: 5, display: 'grid', placeItems: 'center' }}
    >
      <Typography variant="subtitle2" color={textColor} textAlign="center" sx={{ maxWidth: 200 }}>
        {footerSection.summary}
      </Typography>
    </Box>
  );
}
