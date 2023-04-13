import type React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import userEvent from '@testing-library/user-event';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';

export type PortalAdminId = 'portal-admin-title' | 'portal-admin-actions';

export function renderWithPortalAdminId<P>(Component: React.FC, props: P, id?: PortalAdminId) {
  let node = document.getElementById(id);
  if (!node) {
    node = document.createElement('div');
    node.setAttribute('id', id);
    document.body.appendChild(node);
  }
  return {
    user: userEvent.setup(),
    ...render(<Component {...props} />),
  };
}
