const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoute');
const keycloak = require('./middlewares/keycloak');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

const sessionStore = new SequelizeStore({
  db: sequelize
});

app.use(session({
  secret: 'some secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1800000 }
}));

sessionStore.sync();

app.use(keycloak.middleware());
app.use('/users', keycloak.protect(), userRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`User Service running on port ${port}`);
});
