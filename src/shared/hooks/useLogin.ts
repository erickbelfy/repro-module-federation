/* eslint-disable camelcase */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState({
    message: undefined,
  });
  const navigate = useNavigate();

  const handleLogin = async ({
    confirmPassword,
  }: {
    emailAddress?: string;
    password?: string;
    confirmPassword?: string;
    staticPassword?: string;
  }) => {
    const isChangePasswordForm = !!confirmPassword;
    setLoading(true);

    try {
      const isDashboard = window.location.pathname.includes('dashboard');

      if (isChangePasswordForm && isDashboard) {
        navigate('/complete-profile', { replace: true });
        return;
      }

      navigate('/', { replace: true });
    } catch (e) {
      setAuthError(e?.response?.data);
      // eslint-disable-next-line consistent-return
      return Promise.reject(e?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, authError };
};
