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

  withName (name) {
      this.name = name;
      return this;
  }

  getName () {
      return this.name;
  }

  withPort (port) {
    this.port = port;
    return this;
  }

  getPort () {
      return this.port;
  }

  withContentType (contentType) {
    this.contentType = contentType;
    return this;
  }

  getContentType () {
      return this.contentType;
  }

  withData (data) {
      this.data = data;
      return this;
  }

  getData () {
      return this.data;
  }

 start () {
    this.server = http.createServer((req, res) => {
    res.statusCode = 200;
    let url = req.url.match(/\/(.*)\/(.*)/);

  //  console.log('A ver: ', url);
  //  console.log(req.url, req.method);

    res.setHeader('Content-Type', this.contentType);
    this.reply(url, req.method, res);

  });

  this.server.listen(this.port, this.hostname, () => {
    console.log(`[miniapi server running at http://${this.hostname}:${this.port}/]`);
  });
 }

 stop () {
   this.server.close();
 }

  version ()  {
    return '1.0';
  }

  reply (url, method, res) {
    let data = '';
    switch (method) {
      case 'GET':   if (null == url || url[1] === '' || (url[1] === this.name && url[2] == '')) {
                      data = this.data;
                    } else if (url[1] === this.name && url[2] != '') {
                      data = this.data.filter( item => item.id==url[2])[0] || {};
                    }
                  break;
      case 'POST':
                    data = {error: 'POST Not supported yet. Stay tuned.'};
                    break;
      case 'PUT':
                    data = {error: 'PUT Not supported yet. Stay tuned.'};
                    break;
      case 'DELETE':
                    data = {error: 'PUT Not supported yet. Stay tuned.'};
                    break;
      default:
                    data = { error: 'Whatever you tried, it is not supported.'};
                    break;
     }
      res.end(`${JSON.stringify(data)}\n`);
  }
};

module.exports=new Miniapi('user');
