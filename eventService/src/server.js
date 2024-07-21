const express = require('express');
const { listenForMessages } = require('./queues/queueListener');
const eventRoutes = require('./routes/eventRoutes');
const keycloak = require('./middlewares/keycloak');

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

sequelize.sync();
