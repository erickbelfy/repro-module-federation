const PROJECT_ID = 'authentication-ui';
const CLIENT_PORT = process.env.CLIENT_PORT || 3007;
const PROTOCOL = process.env.PROTOCOL || 'http';
const PROTOCOL_CDN = process.env.PROTOCOL_CDN || 'https';
const HOST = process.env.CUSTOM_HOSTNAME || 'localhost';
const DEFAULT_DOMAIN = 'deployment-steel.platform.eu.onespan-internal.com';

const PUBLIC_HOSTNAME = process.env.PUBLIC_HOSTNAME || DEFAULT_DOMAIN;
const AUTH_HOSTNAME = `${PROTOCOL}://${PUBLIC_HOSTNAME}`;
const STATIC_CDN_DOMAIN = process.env.STATIC_CDN_DOMAIN || DEFAULT_DOMAIN;
const STATIC_CDN_URL = `${PROTOCOL_CDN}://${STATIC_CDN_DOMAIN}`;

module.exports = {
  CLIENT_PORT,
  PROTOCOL,
  HOST,
  AUTH_HOSTNAME,
  PROJECT_ID,
  STATIC_CDN_URL,
};
