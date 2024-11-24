import { GoogleOAuthUserInfo } from "@/models/user_info.ts";

export function decodeUserInfo(token: string): GoogleOAuthUserInfo | null {
  try {
    const json = atob(token.split(".")[1]);
    const parsedResult = GoogleOAuthUserInfo.safeParse(JSON.parse(json));
    if (parsedResult.success) {
      return parsedResult.data;
    }
    throw parsedResult.error;
  } catch (e) {
    console.log(`Some error occurred while parsing Google Oauth token`);
    console.log(e);
    return null;
  }
}
