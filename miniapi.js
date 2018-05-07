const http = require('http');
const requestHandler = require('./requestHandler');
const log = require('./log');
const fs = require('fs');

let data = [{ id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}];


class Miniapi  {
  constructor (name) {
    this.name = name;
    this.port = 3000;
    this.contentType = 'application/json';
    this.data = data;
    this.hostname = 'localhost';
    this.id = 'id';
    this.persist = false;
    this.file = null;
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

  withDataFrom (file) {
      try {
	  this.file = file;
      this.data = JSON.parse(fs.readFileSync(this.file));
      } catch (e) {
	console.log('ERROR' + e);
       //this.data = [];
      }
      return this;
  }

  withId (id) {
    this.id = id;
    return this;
  }

  getId() {
    return this.id;
  }

  getPersist() {
	return this.persist;
  }

  withPersist() {
	this.persist = true; 
	return this;
  }

 start () {
   requestHandler.setData(this.data);
   requestHandler.setName(this.name);
   requestHandler.setId(this.id);

    this.server = http.createServer((req, res) => {
    let url = req.url.split("/");
    res.setHeader('Content-Type', this.contentType);
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
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
    log.info(`[miniapi server running at http://${this.hostname}:${this.port}/]`);
  });
 }

 stop () {
   this.data = data; 
   log.info(`[miniapi Stopped]  data: ${JSON.stringify(this.data)}`);
   this.server.close();
 }

  version ()  {
    return '1.0';
  }

  reply (url, method, res, requestBody) {
    res.data = {};
    res.statusCode = 404;

    switch (method) {
      case 'GET':
                  res = requestHandler.get(url, method, res);
                  break;
      case 'POST':
                    res = requestHandler.post(url, method, res, requestBody);
                    break;
      case 'PUT':
                    res = requestHandler.put(url, method, res, requestBody);
                    break;
      case 'PATCH':
                    res = requestHandler.patch(url, method, res, requestBody);
                    break;
      case 'DELETE':
                    res = requestHandler.delete(url, method, res);
                    break;
      default:
                    res.data = { error: 'Whatever you tried, it is not supported.'};
                    res.statusCode = 404;
                    break;
     }

	  if (method !== 'GET') { this.persistIfEnabled(); }
      res.end(`${JSON.stringify(res.data)}\n`);
  }

  persistIfEnabled() {
	if (this.getPersist()) {
		fs.writeFileSync(this.file, JSON.stringify(this.data));  
	}
  }
};

module.exports=new Miniapi('user');
