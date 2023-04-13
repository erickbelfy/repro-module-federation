export const defaultValues = {
  emailAddress: '',
  password: '',
};

// 14 chars, 1 number, 1 special char min.
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*_\-+=`|(){}[\]:;"'<>,.?/])\S{14,98}$/;

export const MAX_LENGTH = 255;
export const MAX_LENGTH_PASSWORD = 98;
export const MIN_LENGTH_PASSWORD = 14;

export const errorCodes = {
  VALIDATION_FAILED_NEW_PASSWORD_MISSING: 'platform.users.login.new-password-null',
  CONFLICT_UNAUTHORIZED_USER: 'platform.users.login.unauthorized-user',
};
