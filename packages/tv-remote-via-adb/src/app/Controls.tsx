import { Box, IconButton, BoxProps } from '@mui/material';
import { FaArrowLeft, FaHome } from 'react-icons/fa';
import { theme } from '@vighnesh153/ui';
import { useKeyPress } from '@vighnesh153/react-hooks';
import { DPad } from './DPad';
import { useHistory } from './useHistory';
import { useDevices } from './useDevices';

export interface ControlsProps extends BoxProps {}

const iconButtonSx: BoxProps['sx'] = {
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.secondary.main,
  border: `2px solid transparent`,
  ':hover': {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.secondary.main,
  },
};

export function Controls({ ...props }: ControlsProps) {
  const { selectedDevice } = useDevices();
  const { fetchHistory } = useHistory();

  const executeInputKeyEvent = async (key: string) => {
    if (!selectedDevice) return;

    const url = `/api/execute?device=${encodeURIComponent(selectedDevice)}&command=${encodeURIComponent(
      `shell input keyevent ${key}`
    )}`;
    await fetch(url, { method: 'POST' });
    fetchHistory();
  };

  useKeyPress({
    key: 'ArrowDown',
    onEvent: () => {
      executeInputKeyEvent('DPAD_DOWN');
      console.log('down pressed');
    },
  });
  useKeyPress({ key: 'ArrowUp', onEvent: () => executeInputKeyEvent('DPAD_UP') });
  useKeyPress({ key: 'ArrowLeft', onEvent: () => executeInputKeyEvent('DPAD_LEFT') });
  useKeyPress({ key: 'ArrowRight', onEvent: () => executeInputKeyEvent('DPAD_RIGHT') });

  const onUpClick = () => {
    executeInputKeyEvent('DPAD_UP');
  };
  const onDownClick = () => {
    executeInputKeyEvent('DPAD_DOWN');
  };
  const onLeftClick = () => {
    executeInputKeyEvent('DPAD_LEFT');
  };
  const onRightClick = () => {
    executeInputKeyEvent('DPAD_RIGHT');
  };
  const onCenterClick = () => {
    executeInputKeyEvent('DPAD_CENTER');
  };
  const onBackClick = () => {
    executeInputKeyEvent('BACK');
  };
  const onHomeClick = () => {
    executeInputKeyEvent('HOME');
  };

  return (
    <Box component="section" {...props}>
      <DPad
        onUpClick={onUpClick}
        onDownClick={onDownClick}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
        onCenterClick={onCenterClick}
        sx={{ margin: 'auto' }}
      />
      <Box
        sx={{
          width: 310,
          mt: 2,
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <IconButton size="large" sx={iconButtonSx} onClick={onBackClick}>
          <FaArrowLeft />
        </IconButton>
        <IconButton size="large" sx={iconButtonSx} onClick={onHomeClick}>
          <FaHome />
        </IconButton>
      </Box>
    </Box>
  );
}
