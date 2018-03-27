http = require('http');


let data = [{ id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}];
let id = 3;

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

    res.setHeader('Content-Type', this.contentType);

    if (req.method === 'POST') {
        var body = '';
        var self = this;
       req.on('data', function (data) {
           body += data;
       });
       req.on('end', function () {
         self.reply(url, req.method, res, body);
       });
    } else {
      this.reply(url, req.method, res);
    }
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

  reply (url, method, res, requestBody) {
    let data = {};
    res.statusCode = 404;

    switch (method) {
      case 'GET':   if (null == url || url[1] === '' || (url[1] === this.name && url[2] == '')) {
                      data = this.data;
                      res.statusCode = 200;
                    } else if (url[1] === this.name && url[2] != '') {
                      data = this.data.filter( item => item.id==url[2])[0] || {};
                      res.statusCode = data.id==undefined?404:200;
                  }
                  break;
      case 'POST':  if (null != url && url[1] === this.name) {
                        let newData = JSON.parse(requestBody);
                        newData.id = id++;
                        this.data.push(newData);
                        data = newData;
                        res.statusCode = 200;
                    } else {
                        data = {error: 'POST Not supported yet. Stay tuned.'};
                        res.statusCode = 404;
                    }
                    break;
      case 'PUT':
                    data = {error: 'PUT Not supported yet. Stay tuned.'};
                    res.statusCode = 404;
                    break;
      case 'DELETE':
                     if (null == url || url[1] === '' || (url[1] === this.name && url[2] == '')) {
                       res.statusCode = 404
                     } else if (url[1] === this.name && url[2] != '') {
                       data = this.data.filter( item => item.id==url[2])[0] || {};
                       this.data = this.data.filter( item => item.id!=url[2]);
                       res.statusCode = data.id==undefined?404:200;;
                     }
                    break;
      default:
                    data = { error: 'Whatever you tried, it is not supported.'};
                    res.statusCode = 404;
                    break;
     }

      res.end(`${JSON.stringify(data)}\n`);
  }
};

module.exports=new Miniapi('user');
