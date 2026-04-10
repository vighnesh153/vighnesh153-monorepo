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
    <div className="w-29.25">
      {$loggedInUser !== null
        ? (
          <Menu>
            <MenuButton className="flex gap-2 items-center">
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
            <MenuItems
              anchor={{
                to: "bottom start",
                gap: 8,
              }}
              className="z-(--z-app-bar) py-2 bg-secondary"
            >
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
