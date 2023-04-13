const { shared } = require('./shared.config');
const { MFE_PROJECT_APP, REMOTE_ENTRY_FILENAME } = require('./constants');
const { PROJECT_ID } = require('../constants');
const { remotes } = require('./remotes');

module.exports = {
  name: MFE_PROJECT_APP,
  filename: `${PROJECT_ID}/${REMOTE_ENTRY_FILENAME}.js`,
  exposes: {
    './reactAdminAuth': './src/reactAdminAuth',
  },
  shared,
};
