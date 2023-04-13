import useAxios from 'axios-hooks';
import type { AxiosError } from 'axios';
import useLoginService from '../login';
import {
  userCredentials,
  domainValidationMock,
  loginMock,
  useLoginAxiosSignature,
} from '../../testing/mocks/login';

jest.mock('axios-hooks');

const mockedUseAxios = useAxios as jest.MockedFunction<typeof useAxios>;

describe('Login service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should login', async () => {
    const executePostMock = jest.fn().mockResolvedValueOnce({ data: loginMock });
    mockedUseAxios.mockReturnValue([
      { data: loginMock, loading: false, error: {} as AxiosError },
      executePostMock,
      jest.fn(),
    ]);
    const { accountUuid, clientId, realmId } = domainValidationMock;
    const { login } = useLoginService();
    const res = await login({
      accountId: accountUuid,
      clientId,
      realmId,
      ...userCredentials,
    });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(res).toMatchObject({ data: loginMock });
    expect(executePostMock).toHaveBeenCalledWith(useLoginAxiosSignature);
  });
});
