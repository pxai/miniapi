const miniapi = require('./');

miniapi
  .withPort(3200)
  .withDataFrom('./sample.json')
  .withPersist()
  .start();
