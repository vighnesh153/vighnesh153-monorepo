import { AxiosRequestConfig } from 'axios';

interface AuthConfigProps {
  personalAccessToken: string;

  baseConfig?: AxiosRequestConfig;
}

export function withAuthConfig(props: AuthConfigProps): AxiosRequestConfig {
  const baseConfig = props.baseConfig ?? {};
  return {
    ...baseConfig,
    headers: {
      ...baseConfig.headers,
      Authorization: `token ${props.personalAccessToken}`,
    },
  };
}
