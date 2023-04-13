import type { UseAxiosResult } from 'axios-hooks';
import { fireEvent, waitFor } from '@testing-library/react';
import type { AxiosError } from 'axios';
import {
  loginMock,
  userPasswordNull,
  tokenApiResponseMock,
  domainValidationMock,
  invalidDomainValidation,
  userNotFound,
} from '../../../shared/testing';
import dataIds from '../dataIds';
import errorNotificationDataIds from '../../../components/ErrorNotification/dataIds';
import { getView, fillLoginForm } from './utils';
import messages from '../messages';
import useGetDomainValidation from '../../../shared/services/domainValidation';
import useLoginService from '../../../shared/services/login';
import useTokenService from '../../../shared/services/token';
import type { UserPool } from '../../../shared/types';

jest.mock('../../../shared/services/login');
jest.mock('../../../shared/services/domainValidation');
jest.mock('../../../shared/services/token');

const mockedDomainValidation = useGetDomainValidation as jest.MockedFunction<
  typeof useGetDomainValidation
>;
const responseValuesStub = { data: domainValidationMock, loading: false, error: {} as AxiosError };
const useDomainValidationStub: UseAxiosResult<UserPool> = [
  responseValuesStub,
  jest.fn(),
  jest.fn(),
];
const useInvalidDomainValidationStub: UseAxiosResult<UserPool> = [
  {
    data: {} as UserPool,
    loading: false,
    error: { response: { data: invalidDomainValidation } } as AxiosError,
  },
  jest.fn(),
  jest.fn(),
];

const mockedLogin = useLoginService as jest.MockedFunction<typeof useLoginService>;
const mockedTokenService = useTokenService as jest.MockedFunction<typeof useTokenService>;
const mockOnSubmitPromise = jest.fn();

describe('<LoginPage /> Component', () => {
  beforeEach(() => {
    mockedDomainValidation.mockImplementation(() => useDomainValidationStub);
    mockedLogin.mockImplementation(() => {
      return { login: jest.fn().mockReturnValue({ data: loginMock }) };
    });
    mockedTokenService.mockImplementation(() => {
      return { tokenExchange: jest.fn().mockReturnValue({ data: tokenApiResponseMock }) };
    });
    mockOnSubmitPromise.mockImplementation(() => {
      return Promise.resolve(true);
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should render', () => {
    const { getByTestId } = getView(mockOnSubmitPromise);
    const view = getByTestId(dataIds.LoginPage.id);
    expect(view).toBeInTheDocument();
  });

  it('Should submit login form', async () => {
    const { getByTestId, queryByTestId } = await fillLoginForm(mockOnSubmitPromise);
    const submitButton = getByTestId(dataIds.LoginPage.submitButton.id);
    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
    await waitFor(() => expect(getByTestId(dataIds.LoginPage.submitButton.id)).toBeEnabled());
    expect(queryByTestId(dataIds.LoginPage.authError.id)).toBeNull();
  });

  it('Should alert an invalid solution instance', async () => {
    mockedDomainValidation.mockImplementation(() => useInvalidDomainValidationStub);
    mockOnSubmitPromise.mockRejectedValue({
      message: invalidDomainValidation.validationErrors[0].message,
    });
    const wrapper = await fillLoginForm(mockOnSubmitPromise);
    const { getByTestId } = wrapper;
    const submitButton = getByTestId(dataIds.LoginPage.submitButton.id);
    expect(submitButton).toBeEnabled();
    fireEvent.click(submitButton);
    const authError = await waitFor(() =>
      getByTestId(errorNotificationDataIds.ErrorNotification.id)
    );
    expect(authError).toHaveTextContent(invalidDomainValidation.validationErrors[0].message);
  });

  it('Should throw unauthorized error', async () => {
    const axiosUserNotFoundError = { response: { data: userNotFound } } as AxiosError;
    mockedLogin.mockImplementation(() => {
      return { login: jest.fn().mockRejectedValue(axiosUserNotFoundError) };
    });
    mockOnSubmitPromise.mockRejectedValue({
      message: messages.invalidLogin.defaultMessage,
    });
    const wrapper = await fillLoginForm(mockOnSubmitPromise);
    const { getByTestId } = wrapper;
    const submitButton = getByTestId(dataIds.LoginPage.submitButton.id);
    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
    await waitFor(() => expect(getByTestId(dataIds.LoginPage.submitButton.id)).toBeEnabled());
    expect(getByTestId(errorNotificationDataIds.ErrorNotification.id)).toHaveTextContent(
      messages.invalidLogin.defaultMessage
    );
  });

  it('Should throw password null error and redirect to reset-password', async () => {
    const axiosUserNotFoundError = { response: { data: userPasswordNull } } as AxiosError;
    mockedLogin.mockImplementation(() => {
      return { login: jest.fn().mockRejectedValue(axiosUserNotFoundError) };
    });
    mockOnSubmitPromise.mockRejectedValue(userPasswordNull);
    const wrapper = await fillLoginForm(mockOnSubmitPromise);
    const { getByTestId, queryByText } = wrapper;
    const submitButton = getByTestId(dataIds.LoginPage.submitButton.id);
    await waitFor(() => {
      expect(queryByText(/Log in/, { selector: 'h1' })).toBeInTheDocument();
    });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(queryByText(/Reset your password/, { selector: 'p' })).toBeInTheDocument();
    });
  });
});
