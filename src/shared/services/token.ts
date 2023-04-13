/* eslint-disable camelcase */
import useAxios from 'axios-hooks';
import type { TokenResponse, TokenRequest } from '../types';

const useTokenService = () => {
  const [, executePost] = useAxios<TokenResponse>({ method: 'POST' }, { manual: true });
  const tokenExchange = ({
    accessToken,
    idToken,
    solutionInstanceId,
    scope = '',
  }: TokenRequest) => {
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
    };
    const qs = new URLSearchParams(queryString);
    const url = `/api/tokens/v1/oauth2/token?${qs}`;
    return executePost({ url });
  };
  return { tokenExchange };
};
export default useTokenService;
