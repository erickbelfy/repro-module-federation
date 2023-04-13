import pluralize from 'pluralize';
import { camelCase } from './utils';

export const sanitizeResourceResult = (resource) => camelCase(resource);

// TODO: Figure out if we should try both '{resource}Id' and '{resource}Uuid' by default
export const sanitizeResourceId = (resource) =>
  `${pluralize.singular(sanitizeResourceResult(resource))}Id`;

// A cached version of these mappings would be faster.
// We don't expect them to change as part of normal operations but,
// It makes it harder to test and, with MFEs, there might be some conflicts.
export function ospDataMapper(
  resource: string,
  attributesMapper: { id?: string; results?: string } = {}
) {
  const attrMap = {
    id: sanitizeResourceId(resource),
    results: sanitizeResourceResult(resource),
    ...attributesMapper,
  };

  const remoteToLocal = (remote) => {
    const mapped = { ...remote };
    if (attrMap.id in remote) {
      mapped.id = remote[attrMap.id];
      delete mapped[attrMap.id];
    }
    return mapped;
  };

  const remoteResultsToLocal = (remote) => {
    return remote[attrMap.results].map(remoteToLocal);
  };

  const localToRemote = (local) => {
    const mapped = { ...local };
    // Because localToRemote can be used in create and update, it may not contain an id
    if ('id' in local) {
      mapped[attrMap.id] = local.id;
      delete mapped.id;
    }
    return mapped;
  };

  return { remoteToLocal, remoteResultsToLocal, localToRemote };
}
