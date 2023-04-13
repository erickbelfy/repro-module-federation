const { shared } = require('./shared.config');
const { MFE_PROJECT_APP, REMOTE_ENTRY_FILENAME } = require('./constants');
const { PROJECT_ID } = require('../constants');
const { remotes } = require('./remotes');

module.exports = {
  name: MFE_PROJECT_APP,
  filename: `${PROJECT_ID}/${REMOTE_ENTRY_FILENAME}.js`,
  exposes: {
    './components': './src/components',
    // if you comment reactAdminAuth remote you will notice that it will work as expected
    // it seems like that complex component or react-admin dependency is not generating the ESM's
    // the way the library expects
    './reactAdminAuth': './src/reactAdminAuth',
  },
  shared,
};
