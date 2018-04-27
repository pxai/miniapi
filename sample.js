const miniapi = require('./');

miniapi
  .withPort(3200)
  .withId('_id')
  .withDataFrom('./sample.json')
  .start();
