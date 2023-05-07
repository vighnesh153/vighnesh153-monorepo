'use client';

import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

export function Custom404Page() {
  const [pendingTime, setPendingTime] = useState(5);
  const [pathName, setPathName] = useState('');

  // set the path name (this is needed to avoid getting "window is undefined" error in server
  useEffect(() => {
    setPathName(window.location.pathname);
  }, []);

  // decrement pending time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setPendingTime((o) => Math.max(o - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // redirect to home page once pending time hits 0
  useEffect(() => {
    if (pendingTime === 0) {
      window.location.pathname = '/';
    }
  }, [pendingTime]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography>
        Page {`"${pathName}"`} does not exist. Redirecting you to home page in {pendingTime} seconds
      </Typography>
    </Box>
  );
}
