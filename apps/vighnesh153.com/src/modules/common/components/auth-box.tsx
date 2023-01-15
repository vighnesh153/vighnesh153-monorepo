import { useSession, signIn } from 'next-auth/react';
import { CircularProgress, Box } from '@mui/material';
import { not } from '@vighnesh153/utils';
import { ProfileBox } from './profile-box';
import { SignInButton } from './sign-in-button';

export function AuthBox() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const user = session?.user;

  if (isLoading) {
    return (
      <Box sx={{ width: 46, height: 46, display: 'grid', placeItems: 'center' }}>
        <CircularProgress color="info" size={20} />
      </Box>
    );
  }

  if (not(session) || not(session?.user)) {
    return <SignInButton onClick={() => signIn('google')} />;
  }

  return <ProfileBox user={user} />;
}
