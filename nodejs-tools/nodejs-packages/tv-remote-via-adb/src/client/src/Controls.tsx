import { Box, IconButton, BoxProps } from '@mui/material';
import { FaArrowLeft, FaHome } from 'react-icons/fa';
import { theme } from './theme';
import { DPad } from './DPad';
import { useActionOnKeyPress } from './useActionOnKeyPress';

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

export function Controls({ ...props }: BoxProps) {
  const { onUpClick, onDownClick, onLeftClick, onRightClick, onCenterClick, onBackClick, onHomeClick } =
    useActionOnKeyPress();

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
