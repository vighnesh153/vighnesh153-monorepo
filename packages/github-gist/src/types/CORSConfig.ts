import { AxiosRequestConfig } from 'axios';

export type CORSConfig =
  | { type: 'none' }
  | { type: 'heroku-prefix' }
  | {
      type: 'custom';

      /**
       *  Creates a custom request object to tackle CORS blocking
       */
      customRequestConfig: (url: string) => AxiosRequestConfig;
    };
