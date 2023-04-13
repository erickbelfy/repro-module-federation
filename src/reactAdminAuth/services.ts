/* eslint-disable camelcase */
import type { User, TokenRequest, AuthResponse, UserPool, TokenResponse } from '../shared/types';
import type { DomainType, LoginPayload, RequestOptions, UserPayload } from './types';

const apiNamespace = '/api';
const baseHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const executeFetch = async (request: Request) => {
  try {
    const response = await fetch(request);
    if (!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }
    return await response.json();
  } catch (e) {
    return Promise.reject(e);
  }
};
export const getUserPool = (
  { url }: DomainType,
  { domain = '' }: RequestOptions
): Promise<UserPool> => {
  const request = new Request(`${domain}${apiNamespace}/subscriptions/v1/login-info/${url}`, {
    method: 'GET',
    headers: new Headers({ ...baseHeaders }),
  });
  return executeFetch(request);
};

export const getUserById = (
  { accountId, realmId, userId }: UserPayload,
  { headers, domain = '' }: RequestOptions
): Promise<User> => {
  const request = new Request(
    `${domain}${apiNamespace}/users/v1/accounts/${accountId}/realms/${realmId}/users/${userId}`,
    {
      method: 'GET',
      headers: new Headers({ ...baseHeaders, ...headers }),
    }
  );
  return executeFetch(request);
};

export const login = (
  { emailAddress, password, staticPassword, accountUuid, realmId, clientId }: LoginPayload,
  { domain = '' }: RequestOptions
): Promise<AuthResponse> => {
  const encodedB64 = btoa(clientId);
  const loginReq = new Request(
    // it doest need the /api variable, this back end service is not normalized
    `${domain}/authentication/v1/accounts/${accountUuid}/realms/${realmId}/users/${emailAddress}/login`,
    {
      method: 'POST',
      headers: new Headers({
        ...baseHeaders,
        Authorization: `Basic ${encodedB64}`,
      }),
      body: JSON.stringify({
        credentials: {
          passKey: password,
          staticPassword,
        },
      }),
    }
  );
  return executeFetch(loginReq);
};

export const tokenExchange = (
  { accessToken, idToken, solutionInstanceId, scope = '', params = {} }: TokenRequest,
  { domain = '' }: RequestOptions = {} as RequestOptions
): Promise<TokenResponse> => {
  /*
   * we should review the way that this call is being made, querystring is not
   * a good pattern for a post call, instead it should be a POST body.
   * Please validate it with an architect, create a ticket to refactor.
   * consider replicate the same logic to the Dashboard project
   *
   * today the current RFC6749 of exchange token says that querystring is
   * the safest way of doing OAUTH integrations.
   * for more information : https://datatracker.ietf.org/doc/html/rfc6749#section-8.3
   *
   * set of constants needed for exchange token workflow
   * this may change in a future since this service will manage
   * multiple types of workflows
   */

  const exchangeTokenConstants = {
    grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    subject_token_type: 'urn:ietf:params:oauth:token-type:id_token',
  };
  const { grant_type, client_assertion_type, subject_token_type } = exchangeTokenConstants;
  const queryString = {
    grant_type,
    client_assertion_type,
    subject_token_type,
    client_assertion: accessToken,
    subject_token: idToken,
    ospn_sol_inst: solutionInstanceId,
    ...(scope.length > 0 && { scope }),
    ...params,
  };
  const qs = new URLSearchParams(queryString);
  const url = `/tokens/v1/oauth2/token?${qs}`;

  const request = new Request(`${domain}${apiNamespace}${url}`, {
    method: 'POST',
    headers: new Headers({ ...baseHeaders }),
  });
  return executeFetch(request);
};

export const getPermissions = (
  { domain = '', headers = {} }: RequestOptions = {} as RequestOptions
) => {
  const request = new Request(`${domain}${apiNamespace}/tokens/v1/permissions`, {
    method: 'GET',
    headers: new Headers({ ...baseHeaders, ...headers }),
  });
  return executeFetch(request);
};
