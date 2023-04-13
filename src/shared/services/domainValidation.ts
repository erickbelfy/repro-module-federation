import useAxios from 'axios-hooks';
import type { UserPool } from '../types';

const useGetDomainValidation = (url) => {
  return useAxios<UserPool>(`/api/subscriptions/v1/login-info/${url}`);
};
export default useGetDomainValidation;
