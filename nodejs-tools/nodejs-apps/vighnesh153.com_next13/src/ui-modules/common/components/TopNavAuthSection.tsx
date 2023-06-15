'use client';

import { useSession, signIn } from 'next-auth/react';
import { CircularProgress, Box } from '@mui/material';
import { not } from '@vighnesh153/utils';

import { TopNavLoggedInMenu } from './TopNavLoggedInMenu';
import { SignInButton } from './SignInButton';

export function TopNavAuthSectionLoader() {
  return (
    <Box sx={{ width: 46, height: 46, display: 'grid', placeItems: 'center' }}>
      <CircularProgress color="info" size={20} />
    </Box>
  );
}

export function TopNavAuthSection() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const user = session?.user;

  if (isLoading) {
    return <TopNavAuthSectionLoader />;
  }

  if (not(session) || not(session?.user)) {
    return <SignInButton onClick={() => signIn('google')} />;
  }

  return <TopNavLoggedInMenu user={user} />;
}
