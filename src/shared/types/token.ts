export type TokenResponse = {
  access_token: string;
  expires_in: number;
  issued_token_type: string;
  scope: string;
  token_type: string;
};

export type TokenRequest = {
  scope?: string;
  idToken: string;
  accessToken: string;
  solutionInstanceId: string;
  params?: object;
};
