const miniapi = require('./');

miniapi
  .withPort(3200)
  .withId('_id')
  .withData([{_id: 1, name: 'Thor'},{_id: 2, name: 'Loki'}])
  .start();
