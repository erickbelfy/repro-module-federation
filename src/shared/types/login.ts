export type Authentication = {
  accountId: string;
  realmId: string;
  clientId: string;
  emailAddress: string;
  password: string;
  staticPassword?: string;
};

export type AuthBody = {
  credentials: {
    passKey: string;
    staticPassword: string;
  };
};

export type AuthResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  idToken: string;
  scope: string;
};

export type ResetPasswordPageLocationState = {
  state: {
    emailAddress: string;
    password: string;
  };
};

export type RedirectLocationState = {
  state: {
    emailAddress?: string;
    password?: string;
    from?: {
      pathname: string;
    };
  };
};
