import { Button, ButtonProps } from '@mui/material';
import { CgProfile } from 'react-icons/cg';

export function SignInButton(props: ButtonProps) {
  return (
    <Button variant="contained" startIcon={<CgProfile size={25} />} color="info" {...props}>
      Sign in
    </Button>
  );
}
