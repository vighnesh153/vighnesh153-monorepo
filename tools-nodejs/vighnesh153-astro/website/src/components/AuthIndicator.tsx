import { Show } from "solid-js";
import { useStore } from "@nanostores/solid";

import type { UserInfo } from "@/models/user_info.ts";
import { loggedInUser } from "@/store/auth.ts";
import {
  classes,
  computeInitialsFromName,
  initiateLogout,
} from "@/utils/index.ts";
import { GoogleSignInButton } from "./buttons/index.ts";
import { Avatar } from "./Avatar.tsx";
import { Menu } from "./Menu.tsx";
import type { ListItemProps } from "./ListItem.tsx";

export type AuthIndicatorProps = {
  userInfo: UserInfo;
};

export function AuthIndicator() {
  const $loggedInUser = useStore(loggedInUser);

  const menuItems: ListItemProps[] = [
    {
      text: "Log out",
      onClick: () => initiateLogout(),
    },
  ];

  return (
    <div class="w-[117px]">
      <Show when={$loggedInUser() !== null} fallback={<GoogleSignInButton />}>
        <Menu
          placement="bottom-end"
          items={menuItems}
          controlElement={(_, toggle) => (
            <button
              class="flex gap-3 items-center"
              onClick={() => toggle()}
            >
              <div class="shrink-0">
                <Avatar
                  userInitials={computeInitialsFromName($loggedInUser()!.name)}
                  imageLink={$loggedInUser()!.profilePictureUrl}
                />
              </div>
              <div
                class={classes(
                  `
              w-73 inline-block
              grow-0
              whitespace-nowrap overflow-hidden text-ellipsis
              `,
                )}
              >
                {$loggedInUser()!.name.split(" ")[0]}
              </div>
            </button>
          )}
        />
      </Show>
    </div>
  );
}
