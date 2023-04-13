import useAxios from 'axios-hooks';
import type { AxiosError } from 'axios';
import useTokenService from '../token';

jest.mock('axios-hooks');

const tokenResp = { token: 'fooBarZooom', scope: undefined };
const idToken = 'mockIdToken';
const accessToken = 'mockAccessToken';
const scope = 'urn:ospn:platform:plans';
const solutionInstanceId = 'mockSolutionInstanceId';

jest.mock('axios-hooks');

const mockedUseAxios = useAxios as jest.MockedFunction<typeof useAxios>;
const executePostMock = jest.fn().mockResolvedValueOnce({ data: tokenResp });
mockedUseAxios.mockReturnValue([
  { data: tokenResp, loading: false, error: {} as AxiosError },
  executePostMock,
  jest.fn(),
]);

describe('tokenService tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should fetch a new token', async () => {
    const { tokenExchange } = useTokenService();
    const res = await tokenExchange({ scope, accessToken, idToken, solutionInstanceId });
    expect(res).toMatchObject({ data: tokenResp });
  });
  it('Should fetch a new token with empty scope', async () => {
    const customTokenResp = { token: 'fooBarZooom', scope: '' };
    const customMockedResponse = {
      data: customTokenResp,
    };

    const executePostCustom = jest.fn().mockResolvedValueOnce({ data: customTokenResp });
    mockedUseAxios.mockReturnValue([
      { data: customTokenResp, loading: false, error: {} as AxiosError },
      executePostCustom,
      jest.fn(),
    ]);
    const { tokenExchange } = useTokenService();
    const res = await tokenExchange({ accessToken, idToken, solutionInstanceId });
    expect(res).toMatchObject(customMockedResponse);
  });
});
