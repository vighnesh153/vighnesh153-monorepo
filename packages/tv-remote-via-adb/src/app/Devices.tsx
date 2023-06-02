import { Box, BoxProps, FormControl, InputLabel, Typography, Select, MenuItem } from '@mui/material';
import { useEffect } from 'react';
import { useDevices } from './useDevices';

export function Devices(props: BoxProps) {
  const { selectedDevice, setSelectedDevice, devices, fetchDevices } = useDevices();

  useEffect(() => {
    fetchDevices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box {...props}>
      {devices.length === 0 && <Typography>No devices available</Typography>}
      {devices.length > 0 && (
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="label-select-device" sx={{ color: 'hsla(226, 70%, 88%, 0.65) !important' }}>
              Select Device
            </InputLabel>
            <Select
              labelId="label-select-device"
              id="select-device"
              value={selectedDevice}
              label="Select Device"
              onChange={(e) => setSelectedDevice(e?.target.value)}
              sx={{
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23) !important',
                },
              }}
            >
              {devices.map((device) => (
                <MenuItem key={device} value={device}>
                  {device}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </Box>
  );
}