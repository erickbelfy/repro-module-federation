/* eslint-disable camelcase,@typescript-eslint/no-use-before-define */
import { fetchUtils, Options } from 'react-admin';
import { ospDataProvider } from '../dataProvider';

/**
 * @todo revisit the AuthProvider try to refactor it
 * - detach useAuthActions and useAuthState from the data provider
 * - remove each event to smaller files
 * - getUserPermissions should work with reset-password workflow
 * today we need to use AuthProvider to store the permissions.
 * - improve the way we choose the platform domain variable
 * - improve the service api calls
 *
 *  @todo remove this eslint clause in the next sprint
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
export const useAuthProvider = ({ apiUrl }) => {
  const authProvider = {
    login: async () => {
      try {
        return Promise.resolve();
      } catch (e) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({ message: e.message, ...e });
      }
    },
    logout: () => {
      sessionStorage.clear();
      return Promise.resolve();
    },
    checkAuth: () => {
      const publicRoutes = ['reset-password', 'complete-profile'];
      if (
        publicRoutes.filter((route) => window.location.pathname.includes(route))
          .length
      ) {
        return Promise.resolve();
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.resolve();
    },
    checkError: () => {
      return Promise.reject();
    },
    getIdentity: async () => {
      return Promise.resolve();
    },
    getPermissions: async () => {
      return Promise.resolve();
    },
  };

  const fetchJson = (url: string, options = {} as Options) => {
    // eslint-disable-next-line no-param-reassign
    options.user = {
      authenticated: true,
      token: `foo`,
    };
    return fetchUtils.fetchJson(url, options);
  };

  const dataProvider = ospDataProvider(apiUrl, fetchJson);

  return { authProvider, dataProvider };
};
