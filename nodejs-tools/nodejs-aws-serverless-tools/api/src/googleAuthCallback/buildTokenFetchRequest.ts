import { JsonHttpPostRequest } from '@vighnesh153/tools';

type TokenFetchRequestBuilderProps = {
  authCallbackCode: string;
  googleClientId: string;
  googleClientSecret: string;
  redirectUri: string;
};

export interface TokenFetchRequestBuilder {
  build(props: TokenFetchRequestBuilderProps): JsonHttpPostRequest<FormData>;
}

export class TokenFetchRequestBuilderImpl implements TokenFetchRequestBuilder {
  build({
    authCallbackCode,
    googleClientId,
    googleClientSecret,
    redirectUri,
  }: TokenFetchRequestBuilderProps): JsonHttpPostRequest<FormData> {
    const formData = new FormData();
    formData.append('code', authCallbackCode);
    formData.append('client_id', googleClientId);
    formData.append('client_secret', googleClientSecret);
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', redirectUri);

    return {
      path: 'https://oauth2.googleapis.com/token',
      data: formData,
    };
  }
}
