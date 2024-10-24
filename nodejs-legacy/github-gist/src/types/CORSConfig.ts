import { AxiosRequestConfig } from "axios";

export type CORSConfig =
  | { type: "none" }
  | { type: "default" }
  | {
    type: "custom";

    /**
     *  Creates a custom request object to tackle CORS blocking
     */
    customRequestConfig: (url: string) => AxiosRequestConfig;
  };
