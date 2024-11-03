import { createSingletonFactory } from "@vighnesh153/tools";
import { UserInfoDecoder, UserInfoDecoderImpl } from "../user_info_decoder";
import { loggerSingletonFactory } from "./logger_factories";

export const userInfoDecoderSingletonFactory =
  /* @__PURE__ */ createSingletonFactory<
    UserInfoDecoder
  >(() => {
    return new UserInfoDecoderImpl(loggerSingletonFactory());
  });
