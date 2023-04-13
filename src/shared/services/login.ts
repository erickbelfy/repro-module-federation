import useAxios from 'axios-hooks';
import type { AuthBody, Authentication, AuthResponse } from '../types';

const useLoginService = () => {
  const [, executePost] = useAxios<AuthResponse, AuthBody>(
    {
      method: 'POST',
    },
    { manual: true }
  );
  const login = async ({
    accountId,
    realmId,
    emailAddress,
    clientId,
    staticPassword,
    password,
  }: Authentication) => {
    const encodedB64 = btoa(clientId);
    return executePost({
      url: `/authentication/v1/accounts/${accountId}/realms/${realmId}/users/${emailAddress}/login`,
      headers: { Authorization: `Basic ${encodedB64}` },
      data: {
        credentials: { passKey: password, staticPassword },
      },
    });
  };

  return { login };
};
export default useLoginService;
