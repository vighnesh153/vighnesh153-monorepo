import { createFactory } from "@vighnesh153/tools";
import { CookieSerializer, CookieSerializerImpl } from "../cookie_serializer";

export const cookieSerializerFactory = /* @__PURE__ */ createFactory<
  CookieSerializer
>(() => {
  return new CookieSerializerImpl();
});
