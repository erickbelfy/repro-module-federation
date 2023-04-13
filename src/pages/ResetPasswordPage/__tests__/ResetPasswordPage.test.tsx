/* TODO remove before merging */
import type { UseAxiosResult } from 'axios-hooks';
import type { AxiosError } from 'axios';
import { fireEvent, waitFor } from '@testing-library/react';
import type { UserPool } from '../../../shared/types';
import useGetDomainValidation from '../../../shared/services/domainValidation';
import useLoginService from '../../../shared/services/login';
import useTokenService from '../../../shared/services/token';
import {
  loginMock,
  invalidUserCredentials,
  tokenApiResponseMock,
  domainValidationMock,
} from '../../../shared/testing';
import dataIds from '../dataIds';
import { getView, fillInResetPasswordForm, fillInResetPasswordFormMismatched } from './utils';
import messages from '../../../shared/hooks/messages';

jest.mock('../../../shared/services/token');
jest.mock('../../../shared/services/login');
jest.mock('../../../shared/services/domainValidation');

const mockedDomainValidation = useGetDomainValidation as jest.MockedFunction<
  typeof useGetDomainValidation
>;
const responseValuesStub = { data: domainValidationMock, loading: false, error: {} as AxiosError };
const useDomainValidationStub: UseAxiosResult<UserPool> = [
  responseValuesStub,
  jest.fn(),
  jest.fn(),
];

const mockedLogin = useLoginService as jest.MockedFunction<typeof useLoginService>;
const mockedTokenService = useTokenService as jest.MockedFunction<typeof useTokenService>;

describe('<ResetPasswordPage /> Component', () => {
  beforeEach(() => {
    mockedDomainValidation.mockImplementation(() => useDomainValidationStub);
    mockedLogin.mockImplementation(() => {
      return { login: jest.fn().mockReturnValue({ data: loginMock }) };
    });
    mockedTokenService.mockImplementation(() => {
      return { tokenExchange: jest.fn().mockReturnValue({ data: tokenApiResponseMock }) };
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('Should render', () => {
    const { getByTestId } = getView();
    const view = getByTestId(dataIds.ResetPasswordPage.id);
    expect(view).toBeInTheDocument();
  });

  it('Should submit reset password form', async () => {
    const { getByTestId, queryByText } = fillInResetPasswordForm();
    const submitButton = getByTestId(dataIds.ResetPasswordPage.submitButton.id);
    await waitFor(() => expect(submitButton).toBeEnabled());
    await waitFor(() => {
      expect(queryByText('Reset password')).toBeInTheDocument();
    });
    fireEvent.click(submitButton);
  });

  it("Should not validate when passwords don't match", async () => {
    const { getByTestId } = fillInResetPasswordFormMismatched();
    const submitButton = getByTestId(dataIds.ResetPasswordPage.submitButton.id);
    await waitFor(() => expect(submitButton).toBeDisabled());
  });

  // @todo the following test should check if the user is entering two different
  // passwords and disable the button in case one of them aren't matching
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Should throw error', async () => {
    const axiosUserNotFoundError = { response: { data: invalidUserCredentials } } as AxiosError;
    mockedLogin.mockImplementation(() => {
      return { login: jest.fn().mockRejectedValue(axiosUserNotFoundError) };
    });
    const wrapper = fillInResetPasswordForm();
    const { getByTestId } = wrapper;
    const submitButton = getByTestId(dataIds.ResetPasswordPage.submitButton.id);
    await waitFor(() => expect(submitButton).toBeEnabled());
    fireEvent.click(submitButton);
    await waitFor(() => expect(submitButton).toBeDisabled());
    await waitFor(() =>
      expect(getByTestId(dataIds.ResetPasswordPage.authError.id)).toHaveTextContent(
        messages.invalidLogin.defaultMessage
      )
    );
  });
});
