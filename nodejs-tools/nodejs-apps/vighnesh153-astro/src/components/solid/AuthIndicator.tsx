import { createEffect, createSignal, Show } from 'solid-js';

import { type CompleteUserInfo } from '@vighnesh153/tools-platform-independent';

import { browserCookieReaderFactory, classes, computeInitialsFromName, initiateLogout } from '@/utils';
import { GoogleSignInButton } from './buttons';
import { Avatar } from './Avatar';
import { Menu } from './Menu';
import type { ListItemProps } from './ListItem';

export type AuthIndicatorProps = {
  userInfo: CompleteUserInfo;
};

export function AuthIndicator() {
  const [shouldDisplay, setShouldDisplay] = createSignal<boolean>(false);
  const [userInfo, setUserInfo] = createSignal<CompleteUserInfo | null>(null);

  const menuItems: ListItemProps[] = [
    {
      text: 'Log out',
      onClick: () => initiateLogout(),
    },
  ];

  // parse user info from cookies
  createEffect(async () => {
    const browserCookieReader = browserCookieReaderFactory();
    setUserInfo(await browserCookieReader.readUserInfo());
    setShouldDisplay(true);
  });

  return (
    <div class="w-[117px]">
      <Show when={shouldDisplay()}>
        <Show when={userInfo() !== null} fallback={<GoogleSignInButton />}>
          <Menu
            placement="bottom-end"
            items={menuItems}
            controlElement={(_, toggle) => (
              <button class="flex gap-3 items-center" onClick={() => toggle()}>
                <div class="shrink-0">
                  <Avatar
                    userInitials={computeInitialsFromName(userInfo()!.name)}
                    imageLink={userInfo()!.profilePictureUrl}
                  />
                </div>
                <div
                  class={classes(
                    `
              w-73 inline-block
              grow-0
              whitespace-nowrap overflow-hidden text-ellipsis
              `
                  )}
                >
                  {userInfo()!.name.split(' ')[0]}
                </div>
              </button>
            )}
          />
        </Show>
      </Show>
    </div>
  );
}
