'use client';

import { useEffect } from 'react';
import { Box, BoxProps, Typography } from '@mui/material';
import { useHistory } from './useHistory';

export function History({ ...props }: BoxProps) {
  const { history, fetchHistory } = useHistory();

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box {...props}>
      <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
        History
      </Typography>
      {history.length === 0 && <Typography color="yellow">No commands were run</Typography>}
      {history.length > 0 && (
        <Box sx={{ maxHeight: '80dvh', overflow: 'scroll' }}>
          {history.map((historyItem, index) => (
            <Box key={index} sx={{ mb: 1, display: 'flex', gap: '1rem' }}>
              <Typography component="p" color="yellow">
                [{new Date(historyItem.time).toLocaleTimeString()}]
              </Typography>
              <Typography component="p" color="white">
                {historyItem.command}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
