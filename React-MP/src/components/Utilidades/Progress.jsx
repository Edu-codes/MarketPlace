import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';

export function Progress() {
    return (
        <Stack spacing={2} direction="column" alignItems="center">
            <CircularProgress color="primary" />
        </Stack>
    );
}

export function LinearIndeterminate() {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  );
}