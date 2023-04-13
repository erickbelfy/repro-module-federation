const { dependencies: pkgDependencies } = require('../../package.json');

const shared = { ...pkgDependencies };

shared['react-admin'] = {
  requiredVersion: pkgDependencies['react-admin'],
  singleton: true,
};

shared['@mui/material'] = {
  requiredVersion: pkgDependencies['@mui/material'],
  singleton: true,
};

shared['@mui/icons-material'] = {
  requiredVersion: pkgDependencies['@mui/icons-material'],
  singleton: true,
};

shared['@onespan/components'] = {
  requiredVersion: pkgDependencies['@onespan/components'],
  singleton: true,
};

// TODO detected issue with eager (cloud-console)
shared['react-router-dom'] = {
  requiredVersion: pkgDependencies['react-router-dom'],
  singleton: true,
};

// TODO detected issue with eager (cloud-console)
shared['@emotion/styled'] = {
  requiredVersion: pkgDependencies['@emotion/styled'],
};

// TODO detected issue with eager (cloud-console)
shared['@emotion/react'] = {
  requiredVersion: pkgDependencies['@emotion/react'],
};

module.exports = { shared };
