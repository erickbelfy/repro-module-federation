import { fetchUtils, DataProvider } from 'react-admin';
import { ospDataMapper } from './ospDataMapper';

const stringify = (query) => new URLSearchParams(query).toString();

export function ospDataProvider(
  apiUrl,
  httpClient = fetchUtils.fetchJson,
  attributesMapper = {}
): DataProvider {
  const urls = {
    // Remove any bad values from the query object
    cleanQuery: (query) =>
      Object.entries(query).reduce(
        (q, [k, v]) => (!v && typeof v === 'number' && v !== 0 ? q : { ...q, [k]: v }),
        {}
      ),
    querystring: (query) => (query ? `?${stringify(urls.cleanQuery(query))}` : ''),
    collection: (resource, query = null) => `${apiUrl}/${resource}${urls.querystring(query)}`,
    single: (resource, id, query = null) => `${apiUrl}/${resource}/${id}${urls.querystring(query)}`,
  };

  return {
    getList(resource, params) {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        ...fetchUtils.flattenObject(params.filter),
        sort: field,
        dir: order?.toLowerCase(),
        offset: (page - 1) * perPage,
        limit: perPage,
      };

      return httpClient(urls.collection(resource, query)).then(({ json }) => ({
        // eslint-disable-next-line @typescript-eslint/no-shadow
        data: ospDataMapper(resource, attributesMapper).remoteResultsToLocal(json),
        total: json.total,
      }));
    },

    getOne(resource, params) {
      return httpClient(urls.single(resource, params.id)).then(({ json }) => ({
        data: ospDataMapper(resource, attributesMapper).remoteToLocal(json),
      }));
    },

    getMany(resource, params) {
      return Promise.all(
        params.ids.map((id) => this.getOne(resource, { id, meta: params.meta }))
      ).then((results) => ({
        data: results.map((r) => r.data),
      }));
    },

    getManyReference(resource, params) {
      const { target, id, filter, ...others } = params;
      return this.getList(resource, {
        ...others,
        filter: {
          ...filter,
          [target]: id,
        },
      });
    },

    create(resource, params) {
      const mapper = ospDataMapper(resource, attributesMapper);
      return httpClient(urls.collection(resource), {
        method: 'POST',
        body: JSON.stringify(mapper.localToRemote(params.data)),
      }).then(({ json }) => ({
        // The exact manipulation we do here depends on the final API design
        data: mapper.remoteToLocal(json),
      }));
    },

    update(resource, params) {
      const mapper = ospDataMapper(resource, attributesMapper);
      return httpClient(urls.single(resource, params.id), {
        method: 'PUT',
        body: JSON.stringify(mapper.localToRemote(params.data)),
      }).then(({ json }) => ({ data: mapper.remoteToLocal(json) }));
    },

    // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
    updateMany(resource, params) {
      const { ids, ...rest } = params;
      return Promise.all(ids.map((id) => this.update(resource, { id, ...rest }))).then(
        (responses) => ({ data: responses.map(({ data }) => data.id) })
      );
    },

    delete(resource, params) {
      return httpClient(urls.single(resource, params.id), {
        method: 'DELETE',
      }).then(({ json }) => {
        return json
          ? { data: ospDataMapper(resource, attributesMapper).remoteToLocal(json) }
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ({} as any);
      });
    },

    // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    deleteMany(resource, params) {
      const { ids, ...rest } = params;
      return Promise.all(ids.map((id) => this.delete(resource, { id, ...rest }))).then(
        (responses) => ({ data: responses.map(({ data }) => data.id) })
      );
    },
  };
}
