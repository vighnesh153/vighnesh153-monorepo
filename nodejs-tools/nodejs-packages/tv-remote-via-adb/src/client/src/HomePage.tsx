'use client';

import { Box, Typography } from '@mui/material';
import { Controls } from './Controls';
import { History } from './History';
import { Devices } from './Devices';

export function HomePage() {
  return (
    <Box component="main" sx={{ maxWidth: 1200, mx: 'auto', mt: 5, display: 'flex' }}>
      <Box sx={{ width: '50%' }}>
        <Devices
          sx={{
            width: 'fit-content',
            mx: 'auto',
            mt: 3,
            mb: 5,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        />
        <Controls sx={{}} />
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography fontStyle="italic">You can also press keys on your keyboard to interact with the TV</Typography>
        </Box>
      </Box>
      <History sx={{ width: '50%' }} />
    </Box>
  );
}
