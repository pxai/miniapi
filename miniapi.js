http = require('http');
let data = [];

class Miniapi  {
  constructor (name) {
    this.name = name;
    this.port = 3000;
    this.contentType = 'application/json';
    this.data = [];
    this.hostname = 'localhost';
    this.init();
  }

  withPort (port) {
    this.port = port;
    return this;
  }

  getPort () {
      return port;
  }

  withContentType (contentType) {
    this.contentType = contentType;
    return this;
  }

  getContentType () {
      return port;
  }

  withData (data) {
      this.data = data;
      return this;
  }

  getData () {
      return data;
  }

 init () {
   this.server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', this.contentType);
    res.end('Hello World!\n');
  });

  this.server.listen(this.port, this.hostname, () => {
    console.log(`Server running at http://${this.hostname}:${this.port}/`);
  });
 }

  version ()  {
    return '1.0';
  }
};

module.exports=new Miniapi('epa');
