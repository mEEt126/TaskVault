const Keycloak = require('keycloak-connect');
const session = require('express-session');

const memoryStore = new session.MemoryStore();

const keycloak = new Keycloak({ store: memoryStore }, {
  realm: process.env.KEYCLOAK_REALM,
  'auth-server-url': 'http://localhost:8080',
  'ssl-required': 'external',
  resource: process.env.KEYCLOAK_CLIENT_ID,
  'public-client': false,
  'confidential-port': 0,
  'credentials': {
    'secret': process.env.KEYCLOAK_CLIENT_SECRET
  }
});

module.exports = keycloak;
