/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

export function Custom404Page() {
  const [pendingTime, setPendingTime] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setPendingTime((previousPendingTime) => {
        const nextPendingTime = previousPendingTime - 1;
        if (nextPendingTime === 0) {
          window.location.pathname = '/';
          clearInterval(interval);
          return previousPendingTime;
        }
        return nextPendingTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography>
        Page {`"${window.location.pathname}"`} does not exist. Redirecting you to home page in {pendingTime}
      </Typography>
    </Box>
  );
}

export default Custom404Page;
