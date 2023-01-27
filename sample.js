const miniapi = require('./');

miniapi
.withPort(3200)
.withId('id')
.withName('player')
.withData([{"id":2,"name":"Juan","number":1,"position":1},{"id":3,"name":"Unai","number":4,"position":2}])
.start();
