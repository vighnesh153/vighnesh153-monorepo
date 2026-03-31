import { useStore } from "@nanostores/react";

import type { UserInfo } from "@/models/user_info.ts";
import { loggedInUser } from "@/store/auth.ts";
import { initiateLogout } from "@/utils/auth.ts";
import { computeInitialsFromName } from "@/utils/computeInitialsFromName.ts";
import { classes } from "@/utils/classes.ts";
import { GoogleSignInButton } from "./buttons/index.ts";
import { Avatar } from "./Avatar.tsx";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export type AuthIndicatorProps = {
  userInfo: UserInfo;
};

export function AuthIndicator() {
  const $loggedInUser = useStore(loggedInUser);

  return (
    <div className="w-[117px]">
      {$loggedInUser !== null
        ? (
          <Menu>
            <MenuButton className="flex gap-3 items-center">
              <div className="shrink-0">
                <Avatar
                  userInitials={computeInitialsFromName($loggedInUser!.name)}
                  imageLink={$loggedInUser!.profilePictureUrl}
                />
              </div>
              <div
                className={classes(
                  `
                    w-20 inline-block
                    grow-0
                    whitespace-nowrap overflow-hidden text-ellipsis
                  `,
                )}
              >
                {$loggedInUser!.name.split(" ")[0]}
              </div>
            </MenuButton>
            <MenuItems>
              <MenuItem>
                <span
                  className={classes(
                    `w-full px-6 py-2 
                    bg-secondary text-text 
                    flex gap-1

                    hover:bg-background hover:text-accent
                    `,
                  )}
                  role="button"
                  onClick={() => initiateLogout()}
                >
                  Log out
                </span>
              </MenuItem>
            </MenuItems>
          </Menu>
        )
        : <GoogleSignInButton />}
    </div>
  );
}
