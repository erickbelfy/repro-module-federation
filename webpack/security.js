const fs = require('fs');
const path = require('path');

const CRT_NAME = 'private';

const httpsServer = () => ({
  type: 'https',
  options: {
    key: fs.readFileSync(path.join(__dirname, `../../../../ssh/${CRT_NAME}.key`)),
    cert: fs.readFileSync(path.join(__dirname, `../../../../ssh/${CRT_NAME}.crt`)),
    ca: fs.readFileSync(path.join(__dirname, `../../../../ssh/${CRT_NAME}.pem`)),
  },
});

const httpServer = 'http';

module.exports = { httpsServer, httpServer };
