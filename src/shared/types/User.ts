import type { UserIdentity } from 'react-admin';

export type User = UserIdentity & {
  created: string;
  description: string;
  displayName: string;
  emailAddress: string;
  enabled: boolean;
  failedLoginAttemptsCount: number;
  firstName: string;
  isPasswordSet: boolean;
  groups: string[];
  groupsMembership: GroupMembership[];
  lastAuthenticated: string;
  lastModified: string;
  lastName: string;
  lastPasswordUpdate: string;
  lockCount: number;
  locked: boolean;
  phoneNumbers: PhoneNumber[];
  title: string;
  realmId: string;
  userId: string;
  userState: string;
  uuid: string;
  accountId: string;
};
export type GroupMembership = {
  groupId: string;
  groupName: string;
};

export type PhoneNumber = {
  value: string;
  type: 'mobile' | 'fixed' | 'home';
};
