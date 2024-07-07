import { createEffect, createSignal } from 'solid-js';

import type { CompleteUserInfo } from '@vighnesh153/types';

import { browserCookieReaderFactory, computeInitialsFromName } from '@/utils';
import { GoogleSignInButton } from './buttons';
import { Avatar } from './Avatar';
import { Popover } from './popover';

export type AuthIndicatorProps = {
  userInfo: CompleteUserInfo;
};

export function AuthIndicator() {
  const [userInfo, setUserInfo] = createSignal<CompleteUserInfo | null>(null);

  createEffect(async () => {
    const browserCookieReader = browserCookieReaderFactory();
    setUserInfo(await browserCookieReader.readUserInfo());
  });

  if (userInfo() === null) {
    return <GoogleSignInButton />;
  }

  return (
    <Popover
      // TODO: add popover content
      popoverContent={<div></div>}
      controlElement={(isOpen, toggle) => (
        <Avatar
          userInitials={computeInitialsFromName(userInfo()!.name)}
          imageLink={userInfo()!.profilePictureUrl}
          onClick={() => toggle()}
        />
      )}
    />
  );
}
