const miniapi = require('./');

miniapi
  .withPort(3200)
  .withData([{id: 1, name: 'Thor'},{ id: 2, name: 'Loki'}])
  .start();
