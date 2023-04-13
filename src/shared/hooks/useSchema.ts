import { useIntl } from 'react-intl';
import * as yup from 'yup';
import resetPasswordMessages from '../../pages/ResetPasswordPage/messages';
import loginMessages from '../../pages/LoginPage/messages';
import { MAX_LENGTH, MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD, PASSWORD_REGEX } from '../constants';

const useResetPasswordSchema = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { formatMessage } = useIntl();

  const schema = yup
    .object({
      staticPassword: yup
        .string()
        .required(
          formatMessage(resetPasswordMessages.isRequired, {
            field: formatMessage(resetPasswordMessages.newPassword),
          })
        )
        .min(
          MIN_LENGTH_PASSWORD,
          formatMessage(resetPasswordMessages.minCharacters, {
            field: formatMessage(resetPasswordMessages.newPassword),
            number: MIN_LENGTH_PASSWORD,
          })
        )
        .max(MAX_LENGTH_PASSWORD)
        .matches(
          PASSWORD_REGEX,
          formatMessage(resetPasswordMessages.passwordError, {
            minLengthPassword: MIN_LENGTH_PASSWORD,
          })
        ),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('staticPassword')], formatMessage(resetPasswordMessages.doNotMatch))
        .required(
          formatMessage(resetPasswordMessages.isRequired, {
            field: formatMessage(resetPasswordMessages.confirmPassword),
          })
        )
        .min(
          MIN_LENGTH_PASSWORD,
          formatMessage(resetPasswordMessages.minCharacters, {
            field: formatMessage(resetPasswordMessages.confirmPassword),
            number: MIN_LENGTH_PASSWORD,
          })
        )
        .max(MAX_LENGTH_PASSWORD)
        .matches(
          PASSWORD_REGEX,
          formatMessage(resetPasswordMessages.passwordError, {
            minLengthPassword: MIN_LENGTH_PASSWORD,
          })
        ),
    })
    .required();

  return { schema };
};

const useLoginSchema = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { formatMessage } = useIntl();

  const schema = yup
    .object({
      emailAddress: yup
        .string()
        .required(
          formatMessage(loginMessages.isRequired, {
            field: formatMessage(loginMessages.emailAddress),
          })
        )
        .max(MAX_LENGTH)
        .email(formatMessage(loginMessages.emailAddressError)),
      password: yup
        .string()
        .required(
          formatMessage(loginMessages.isRequired, { field: formatMessage(loginMessages.password) })
        ),
    })
    .required();

  return { schema };
};

export { useLoginSchema, useResetPasswordSchema };
