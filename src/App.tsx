import { CustomRoutes } from 'react-admin';
import React from 'react';
import { Route } from 'react-router-dom';
import { FederatedResetPasswordPage } from './pages';
import messagesEn from './shared/i18n/en.json';
import { OSAdmin } from './reactAdminAuth';

const locale = 'en';

const App = () => {
  return (
    <OSAdmin
      basename="authentication-ui"
      reactIntl={messagesEn}
      messages={{ en: messagesEn }}
      locale={locale}
      name="Authentication"
    >
      <CustomRoutes>
        <Route path="reset-password" element={<FederatedResetPasswordPage />} />
      </CustomRoutes>
    </OSAdmin>
  );
};

export default App;
