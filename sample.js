const miniapi = require('./');

miniapi
  .withPort(3200)
  .withData([{id: 3, name: 'Thor'},{ id: 666, name: 'Loki'}])
  .start();
