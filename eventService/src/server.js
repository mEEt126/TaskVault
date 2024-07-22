const express = require('express');
const { listenForMessages } = require('../src/queues/queueSubscriber.js');
const eventRoutes = require('../src/routes/eventRoute.js');
const keycloak = require('../src/middlewares/keycloak.js');
const { sequelize } = require('./models');

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());

app.use(keycloak.middleware());
app.use('/events',keycloak.protect(), eventRoutes);


app.listen(port, () => {
  console.log(`Event Service listening at http://localhost:${port}`);
  listenForMessages();
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch(err => {
    console.log('Error: ' + err);
  });

sequelize.sync({alter: true});
