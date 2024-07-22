const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const taskRoutes = require('../src/routes/taskRoute.js');
const keycloak = require('./middlewares/keycloak');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use(keycloak.middleware());
app.use('/tasks',keycloak.protect(), taskRoutes);

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Task Service running on port ${port}`);
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch(err => {
    console.log('Error: ' + err);
  });

sequelize.sync({alter: true}); // alter will chaange only changes in db when it starts
