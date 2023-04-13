import {
  fetchUtils,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  CreateParams,
  CreateResult,
  UpdateParams,
  UpdateResult,
  UpdateManyParams,
  UpdateManyResult,
  DeleteParams,
  DeleteResult,
  DeleteManyParams,
  DeleteManyResult,
} from 'react-admin';

import { ospDataProvider } from '../ospDataProvider';

const API_URL = '/api/url';
const RESOURCE = 'accounts';

const fetchJson = jest.spyOn(fetchUtils, 'fetchJson');

// Reference data for remote and local results
type RemoteAccount = {
  accountId: string;
  tenantId: string;
  firstName?: string;
  lastName?: string;
};

const accounts: Array<RemoteAccount> = [
  { accountId: 'a1', tenantId: 'tenant-01', firstName: 'basic' },
  { accountId: 'a2', tenantId: 'tenant-01', lastName: 'jim' },
];

const localAccounts = Object.freeze([
  {
    id: accounts[0].accountId,
    tenantId: accounts[0].tenantId,
    firstName: accounts[0].firstName,
  },
  {
    id: accounts[1].accountId,
    tenantId: accounts[1].tenantId,
    lastName: accounts[1].lastName,
  },
]);

// params.meta for reuse. Ensures we are funneling the meta param correctly
const meta = { mocked: 'meta' };

const fetchJsonResponse = ({ json }) => ({
  json,
  // TS Compliance...
  status: 200,
  headers: null,
  body: '',
});

describe('ospDataProvider(apiUrl, httpClient?, attributesMapper?)', () => {
  let dataProvider;

  beforeEach(() => {
    fetchJson.mockImplementation(() =>
      Promise.reject(new Error('fetchJson requires a mock implementation'))
    );
  });

  afterEach(() => {
    fetchJson.mockReset();
  });

  describe('ospDataProvider', () => {
    describe('when invoked with (apiUrl) only', () => {
      const json = { accountId: '23' };

      beforeEach(() => {
        dataProvider = ospDataProvider(API_URL);
        fetchJson.mockResolvedValueOnce(fetchJsonResponse({ json }));
      });

      // it uses the default mapping based on resource name for id...
      it('invokes reactAdmin.fetchUtils', async () => {
        expect(await dataProvider.getOne(RESOURCE, { id: 'default-client' })).toEqual({
          data: { id: json.accountId },
        });

        expect(fetchJson).toHaveBeenCalledWith(`${API_URL}/${RESOURCE}/default-client`);
      });
    });

    describe('when invoked with (apiUrl, httpClient)', () => {
      const json = {
        limit: 10,
        offset: 0,
        total: 2,
        [RESOURCE]: [
          { remoteId: 'a1', firstName: 'basic' },
          { [`${RESOURCE.slice(0, -1)}Id`]: 'a2', lastName: 'jim' },
        ],
      };

      let httpClient;

      beforeEach(() => {
        httpClient = jest.fn().mockResolvedValue({ json });
        dataProvider = ospDataProvider(API_URL, httpClient);
      });

      it('invokes the provided httpClient and converts results using defaultMatcher', async () => {
        expect(await dataProvider.getList(RESOURCE, { pagination: {}, sort: {} })).toEqual({
          total: json.total,
          data: [
            { remoteId: 'a1', firstName: 'basic' },
            { id: 'a2', lastName: 'jim' },
          ],
        });

        expect(fetchJson).toHaveBeenCalledTimes(0);
        expect(httpClient).toHaveBeenCalledWith(expect.stringMatching(`${API_URL}/${RESOURCE}`));
      });
    });

    describe('when invoked with (apiUrl, httpClient, attributesMapper)', () => {
      const json = {
        limit: 10,
        offset: 0,
        total: 2,
        remoteResults: [
          { remoteId: 'a1', firstName: 'basic' },
          { remoteId: 'a1', lastName: 'jim' },
        ],
      };

      beforeEach(() => {
        fetchJson.mockResolvedValueOnce(fetchJsonResponse({ json }));

        dataProvider = ospDataProvider(API_URL, fetchUtils.fetchJson, {
          id: 'remoteId',
          results: 'remoteResults',
        });
      });

      it('invokes the provided httpClient and converts the received data with the attribute mapper', async () => {
        expect(
          await dataProvider.getList('dontCacheAccount', { pagination: {}, sort: {} })
        ).toEqual({
          total: json.total,
          data: json.remoteResults.map(({ remoteId: id, ...rest }) => ({ id, ...rest })),
        });

        // The full getList params conversion check is performed later in the tests
        expect(fetchJson).toHaveBeenCalledWith(
          expect.stringMatching(`${API_URL}/${'dontCacheAccount'}`)
        );
      });
    });
  });

  describe('given default httpClient and attributesMapper', () => {
    beforeEach(() => {
      dataProvider = ospDataProvider(API_URL);
    });

    describe('.getList(resource, params)', () => {
      const json = {
        limit: 10,
        offset: 0,
        total: 2,
        accounts,
      };

      const params: GetListParams = {
        meta,
        pagination: {
          page: 1,
          perPage: 10,
        },
        sort: {
          field: 'firstName',
          order: 'ASC',
        },
        filter: { field1: 'value', field2: 'value 2' },
      };

      let result: GetListResult;

      beforeEach(async () => {
        fetchJson.mockResolvedValueOnce(fetchJsonResponse({ json }));

        result = await dataProvider.getList(RESOURCE, params);
      });

      it('calls httpClient on the resource url, including querystring translation of getList params', () => {
        const qs = new URLSearchParams({
          field1: params.filter.field1,
          field2: params.filter.field2,
          sort: params.sort.field,
          dir: params.sort.order.toLowerCase(),
          offset: String((params.pagination.page - 1) * params.pagination.perPage),
          limit: String(params.pagination.page * params.pagination.perPage),
        }).toString();

        expect(fetchJson).toHaveBeenCalledTimes(1);
        expect(fetchJson).toHaveBeenCalledWith(`${API_URL}/${RESOURCE}?${qs}`);

        expect(result).toMatchObject({
          total: json.total,
          data: localAccounts,
        });
      });
    });

    describe('.getOne(resource, params)', () => {
      const [json] = accounts;
      const params: GetOneParams = { id: accounts[0].accountId, meta };

      let result: GetOneResult;

      beforeEach(async () => {
        fetchJson.mockResolvedValueOnce(fetchJsonResponse({ json }));

        result = await dataProvider.getOne(RESOURCE, params);
      });

      it('calls httpClient GET for a single resource', () => {
        expect(fetchJson).toHaveBeenCalledTimes(1);
        expect(fetchJson).toHaveBeenCalledWith(`${API_URL}/${RESOURCE}/${json.accountId}`);

        // Ensure data is transformed correctly
        expect(result).toMatchObject({ data: localAccounts[0] });
      });
    });

    describe('.getMany(resource, params)', () => {
      const params: GetManyParams = { ids: 'abcd'.split(''), meta };

      let result: GetManyResult;

      beforeEach(async () => {
        jest
          .spyOn(dataProvider, 'getOne')
          .mockImplementation((resource, ps: GetOneParams) =>
            Promise.resolve({ data: { method: 'getOne', id: ps.id } })
          );

        result = await dataProvider.getMany(RESOURCE, params);
      });

      afterEach(() => {
        dataProvider.getOne.mockRestore();
      });

      it('returns the result of running .getOne over all params.ids', () => {
        expect(result).toEqual({ data: params.ids.map((id) => ({ method: 'getOne', id })) });

        expect(dataProvider.getOne).toHaveBeenCalledTimes(params.ids.length);
        params.ids.forEach((id) =>
          expect(dataProvider.getOne).toHaveBeenCalledWith(RESOURCE, { id, meta })
        );
      });
    });

    describe('.getManyReference(resource, params)', () => {
      const params: GetManyReferenceParams = {
        meta,
        target: 'tenantId',
        id: 'tenant-01',
        pagination: {
          page: 1,
          perPage: 10,
        },
        sort: {
          field: 'firstName',
          order: 'ASC',
        },
        filter: {
          anotherProp: 'filtered',
        },
      };

      const getListMock: GetListResult = {
        data: [...localAccounts],
        total: localAccounts.length,
      };
      let result: GetManyReferenceResult;

      beforeEach(async () => {
        jest.spyOn(dataProvider, 'getList').mockResolvedValue(getListMock);

        result = await dataProvider.getManyReference(RESOURCE, params);
      });

      afterEach(() => {
        dataProvider.getList.mockRestore();
      });

      // This is a tentative implementation and may not be the correct implementation
      it('calls getList and returns its result', () => {
        expect(result).toBe(getListMock);

        expect(dataProvider.getList).toHaveBeenCalledTimes(1);
        expect(dataProvider.getList).toHaveBeenCalledWith(RESOURCE, {
          pagination: params.pagination,
          sort: params.sort,
          filter: { ...params.filter, [params.target]: params.id },
          meta,
        });
      });
    });

    describe('.create(resource, params)', () => {
      const json = {
        accountId: 'create-id',
        firstName: 'Isaac',
        lastName: 'Newton',
        tenantId: 'tenant-01',
      };
      const params: CreateParams = { data: { firstName: 'Isaac', lastName: 'Newton' }, meta };

      let result: CreateResult;

      beforeEach(async () => {
        fetchJson.mockResolvedValueOnce(fetchJsonResponse({ json }));

        result = await dataProvider.create(RESOURCE, params);
      });

      it("calls httpClient POST for the resource's collection url", () => {
        expect(fetchJson).toHaveBeenCalledTimes(1);
        expect(fetchJson).toHaveBeenCalledWith(`${API_URL}/${RESOURCE}`, {
          method: 'POST',
          body: JSON.stringify(params.data),
        });
      });

      it('returns the formatted data and supplements it with params.data', () => {
        expect(result).toMatchObject({
          data: {
            id: 'create-id',
            firstName: 'Isaac',
            lastName: 'Newton',
            tenantId: 'tenant-01',
          },
        });
      });
    });

    describe('.update(resource, params)', () => {
      // {  id: {mixed}, data: {Object}, previousData: {Object}, meta: {Object} }
      // { data: {Record} }
      const [json] = accounts;
      const params: UpdateParams = {
        id: localAccounts[0].id,
        // Add the id in the data to reflect an update using the full object modified.
        // This also ensures we exercise the data mapping
        data: { id: localAccounts[0].id, firstName: 'jim' },
        previousData: {},
        meta,
      };

      let result: UpdateResult;

      beforeEach(async () => {
        fetchJson.mockResolvedValueOnce(fetchJsonResponse({ json }));

        result = await dataProvider.update(RESOURCE, params);
      });

      it('calls httpClient on the resource url with method "PUT" and the data mapped and stringfied', () => {
        expect(fetchJson).toHaveBeenCalledTimes(1);
        expect(fetchJson).toHaveBeenCalledWith(`${API_URL}/${RESOURCE}/${params.data.id}`, {
          method: 'PUT',
          body: JSON.stringify({ firstName: params.data.firstName, accountId: params.data.id }),
        });
      });

      it('returns the formatted data and supplements it with params.data', () => {
        expect(result).toMatchObject({ data: localAccounts[0] });
      });
    });

    describe('.updateMany(resource, params)', () => {
      const params: UpdateManyParams = {
        ids: 'abcd'.split(''),
        data: { firstName: 'jim' },
        meta,
      };

      let result: UpdateManyResult;

      beforeEach(async () => {
        jest
          .spyOn(dataProvider, 'update')
          .mockImplementation((resource, ps: UpdateParams) =>
            Promise.resolve({ data: { id: ps.id, attr: 'mocked' } })
          );

        result = await dataProvider.updateMany(RESOURCE, params);
      });

      afterEach(() => {
        dataProvider.update.mockRestore();
      });

      it('invokes dataProvider.update for each params.ids and returns {data: [id, id]}', () => {
        expect(dataProvider.update).toHaveBeenCalledTimes(params.ids.length);
        params.ids.forEach((id) =>
          expect(dataProvider.update).toHaveBeenCalledWith(RESOURCE, {
            id,
            data: params.data,
            meta,
          })
        );
      });

      it('returns an object with data containing an array of ids', () => {
        expect(result).toMatchObject({ data: params.ids });
      });
    });

    describe('.delete(resource, params)', () => {
      const [json] = accounts;
      const params: DeleteParams = { id: localAccounts[0].id, previousData: {}, meta };

      let result: DeleteResult;

      beforeEach(async () => {
        fetchJson.mockResolvedValueOnce(fetchJsonResponse({ json }));

        result = await dataProvider.delete(RESOURCE, params);
      });

      it('calls httpClient on the resource url with method DELETE', () => {
        expect(fetchJson).toHaveBeenCalledTimes(1);
        expect(fetchJson).toHaveBeenCalledWith(`${API_URL}/${RESOURCE}/${params.id}`, {
          method: 'DELETE',
        });
      });

      it('returns data correctly transformed', () => {
        expect(result).toMatchObject({ data: localAccounts[0] });
      });
    });

    describe('.deleteMany(resource, params)', () => {
      const params: DeleteManyParams = { ids: 'abcd'.split(''), meta };

      let result: DeleteManyResult;

      beforeEach(async () => {
        jest
          .spyOn(dataProvider, 'delete')
          .mockImplementation((resource, ps: DeleteParams) =>
            Promise.resolve({ data: { method: 'delete', id: ps.id } })
          );

        result = await dataProvider.deleteMany(RESOURCE, params);
      });

      afterEach(() => {
        dataProvider.delete.mockRestore();
      });

      it('returns the result of running .delete over all params.ids', () => {
        expect(dataProvider.delete).toHaveBeenCalledTimes(params.ids.length);
        params.ids.forEach((id) =>
          expect(dataProvider.delete).toHaveBeenCalledWith(RESOURCE, { id, meta })
        );

        expect(result).toEqual({ data: params.ids });
      });
    });
  });
});
