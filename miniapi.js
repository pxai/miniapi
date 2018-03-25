http = require('http');
let data = [{ id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}];

class Miniapi  {
  constructor (name) {
    this.name = name;
    this.port = 3000;
    this.contentType = 'application/json';
    this.data = data;
    this.hostname = 'localhost';
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

 start () {
   this.server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', this.contentType);
    res.end(`${JSON.stringify(this.data)}\n`);
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
