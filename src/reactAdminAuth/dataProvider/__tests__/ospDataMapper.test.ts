import { ospDataMapper, sanitizeResourceId, sanitizeResourceResult } from '../ospDataMapper';

const id = 'my-account-001';
const props = {
  created: 'bla',
  name: 'Some Account',
  isEnabled: true,
  userCount: 32,
};

describe('ospDataMapper(resource, attributesMapper)', () => {
  it('returns a dataMapper for the resource', () => {
    expect(ospDataMapper('account')).toMatchObject({
      remoteToLocal: expect.any(Function),
      remoteResultsToLocal: expect.any(Function),
      localToRemote: expect.any(Function),
    });
  });

  const attributeMapperScenarios = [
    { attributesMapper: { id: 'idProp', results: 'listInHere' }, resource: 'listInHere' },
    { attributesMapper: { id: 'idProp', results: 'listInHere' }, resource: 'accounts' },
    { attributesMapper: { id: 'accountId', results: 'accounts' }, resource: 'accounts' },
  ];
  const returnsTheSame = 'returns as same as the defaultMapper';
  describe.each(attributeMapperScenarios)(
    'given a dataMapper with attributesMapper %o',
    ({ attributesMapper, resource }) => {
      let dataMapper;
      let defaultDataMapper;

      beforeEach(() => {
        defaultDataMapper = ospDataMapper(resource, attributesMapper);
        dataMapper = ospDataMapper(resource, attributesMapper);
      });

      describe('.remoteToLocal(remote)', () => {
        // Although is redundant
        it(`${returnsTheSame}`, () => {
          const remote = { ...props, [attributesMapper.id]: id };
          expect(dataMapper.remoteToLocal(remote)).toMatchObject(
            defaultDataMapper.remoteToLocal(remote)
          );
        });

        it(`returns an object with all properties of remote except remote.${attributesMapper.id}`, () => {
          expect(dataMapper.remoteToLocal(props)).toMatchObject(props);
        });

        describe(`when remote.${attributesMapper.id} exists`, () => {
          it(`returns an object with id == remote.${attributesMapper.id}`, () => {
            expect(dataMapper.remoteToLocal({ ...props, [attributesMapper.id]: id })).toMatchObject(
              {
                ...props,
                id,
              }
            );
          });
        });
      });

      describe('.remoteResultsToLocal(results)', () => {
        const results = [{ ...props, [attributesMapper.id]: id }];

        it(`${returnsTheSame}`, () => {
          // Although is redundant
          const remoteResults = {
            [attributesMapper.results]: results,
          };
          expect(dataMapper.remoteResultsToLocal(remoteResults)).toMatchObject(
            defaultDataMapper.remoteResultsToLocal(remoteResults)
          );
        });

        it(`returns an array of converted objects from results.${attributesMapper.results}`, () => {
          expect(
            dataMapper.remoteResultsToLocal({
              [attributesMapper.results]: results,
            })
          ).toMatchObject(results.map((r) => dataMapper.remoteToLocal(r)));
        });
      });

      describe('.localToRemote(local)', () => {
        it(`${returnsTheSame}`, () => {
          const local = { ...props, id };
          expect(defaultDataMapper.localToRemote(local)).toMatchObject(
            dataMapper.localToRemote(local)
          );
        });
        it('returns an object with all properties of local except local.id', () => {
          expect(dataMapper.localToRemote(props)).toMatchObject(props);
        });

        describe('when local.id exists', () => {
          it(`returns an object with remote.${attributesMapper.id} = local.id`, () => {
            expect(dataMapper.localToRemote({ ...props, id })).toMatchObject({
              ...props,
              [attributesMapper.id]: id,
            });
          });
        });
      });
    }
  );

  const emptyDataMapperScenarios = [
    { attributesMapper: {}, resource: 'client-applications' },
    { attributesMapper: {}, resource: 'clientApplications' },
  ];
  describe.each(emptyDataMapperScenarios)(
    'given an empty dataMapper with a following scenario %o',
    ({ attributesMapper, resource }) => {
      let dataMapper;

      beforeEach(() => {
        dataMapper = ospDataMapper(resource, attributesMapper);
      });

      describe('.remoteToLocal(remote)', () => {
        it(`returns an object with all properties of remote except remote.${sanitizeResourceId(
          resource
        )}`, () => {
          expect(dataMapper.remoteToLocal(props)).toMatchObject(props);
        });

        describe(`when ${sanitizeResourceId(resource)} exists`, () => {
          it(`returns an object with id == ${sanitizeResourceId(resource)}`, () => {
            expect(
              dataMapper.remoteToLocal({ ...props, [sanitizeResourceId(resource)]: id })
            ).toMatchObject({
              ...props,
              id,
            });
          });
        });
      });

      describe('.remoteResultsToLocal(results)', () => {
        const results = [{ ...props, [sanitizeResourceResult(resource)]: id }];

        it(`returns an array of converted objects from results.${sanitizeResourceResult(
          resource
        )}`, () => {
          // if there's no attributeMapper settled it should fall back to resource
          expect(
            dataMapper.remoteResultsToLocal({
              [sanitizeResourceResult(resource)]: results,
            })
          ).toMatchObject(results.map((r) => dataMapper.remoteToLocal(r)));
        });
      });

      describe('.localToRemote(local)', () => {
        it('returns an object with all properties of local except local.id', () => {
          expect(dataMapper.localToRemote(props)).toMatchObject(props);
        });

        describe('when local.id exists', () => {
          it(`returns an object with remote.${sanitizeResourceId(resource)} = local.id`, () => {
            expect(dataMapper.localToRemote({ ...props, id })).toMatchObject({
              ...props,
              [sanitizeResourceId(resource)]: id,
            });
          });

          it(`returns an object with remote.${sanitizeResourceId(resource)} = local.id`, () => {
            expect(dataMapper.localToRemote({ ...props, id })).toMatchObject({
              ...props,
              [sanitizeResourceId(resource)]: id,
            });
          });
        });
      });
    }
  );
});
