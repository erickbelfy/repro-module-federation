/* eslint-disable @typescript-eslint/no-use-before-define */
export const buildAccessControls = (permissions) => {
  const sortedRules = permissions
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    .map((urn) => ospURNMapper({ urn }))
    .sort((r1, r2) => (r1.service < r2.service ? -1 : 1));
  const services = Array.from<string>(new Set(sortedRules.map((rule) => rule.service)));
  return services.reduce((acc, service) => {
    acc[service] = buildServiceActions({ rules: sortedRules, service });
    return acc;
  }, {});
};

const buildServiceActions = ({ rules, service }) => {
  return rules
    .filter((rule) => rule.service === service)
    .reduce((rulesAcc, serviceRule) => {
      const resource = serviceRule.resource ? serviceRule.resource : serviceRule.service;
      const idx = rulesAcc.findIndex((r) => r.resource === resource);
      if (idx > -1 && !rulesAcc[idx].action.includes(serviceRule.action)) {
        rulesAcc[idx].action.push(serviceRule.action);
      } else {
        rulesAcc.push({
          action: [serviceRule.action],
          resource,
        });
      }
      return rulesAcc;
    }, []);
};
export const ospURNMapper = ({ urn }) => {
  const regexes = {
    basic: /^ospn:(?<product>[^:]+):(?<service>[^:]+):(?<action>[^:]+)$/,
    withResource: /^ospn:(?<product>[^:]+):(?<service>[^:]+):(?<resource>[^:]+):(?<action>[^:]+)$/,
    nestedResources:
      /^ospn:(?<product>[^:]+)(?::(?<service>[^:]+))?(?:(?::(?<resource>[^:]+))+):(?<action>[^:]+)$/i,
  };

  const component = urn.split(':').length;
  switch (component) {
    case 4:
      return urn.match(regexes.basic).groups;
    case 5:
      return urn.match(regexes.withResource).groups;
    default:
      // eslint-disable-next-line no-case-declarations
      const match = regexes.nestedResources.exec(urn);
      if (match) {
        return {
          product: match.groups.product,
          service: match.groups.service || null,
          resource: match[0].split(':').slice(3, -1).join('.'),
          action: match.groups.action,
        };
      }
      throw Error(`Invalid URN ${urn}`);
  }
};
