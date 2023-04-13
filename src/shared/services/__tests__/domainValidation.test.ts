import useAxios from 'axios-hooks';
import type { AxiosError } from 'axios';
import domainValidation from '../domainValidation';
import { domainValidationMock } from '../../testing/mocks/login';

jest.mock('axios-hooks');

const mockedUseAxios = useAxios as jest.MockedFunction<typeof useAxios>;

describe('Domain validation service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should return user pool', () => {
    mockedUseAxios.mockReturnValue([
      { data: domainValidationMock, loading: false, error: {} as AxiosError },
      jest.fn(),
      jest.fn(),
    ]);
    const [{ data }] = domainValidation(
      'tejstalskdjas-amused-moser-ca-platform.platform.us.onespan-internal.com'
    );
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(data).toMatchObject(domainValidationMock);
  });
});
