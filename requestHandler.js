const log = require('./log');

let id = 3;

class RequestHandler {
  constructor () {
    this.data = {};
    this.name = '';
  }

  say (){
    return "it works"
  }

  setData(data) {
    this.data = data;
  }

  setName(name) {
    this.name = name;
  }

  get (url, method, res) {
    let data = {};
    res.statusCode = 404;
    if (null == url || url[1] === '' || (url[1] == this.name && url[2] == undefined || url[2] == '')) {
        data = this.data;
        res.statusCode = 200;
    } else if (url[1] === this.name && url[2] != '') {
        data = this.data.filter( item => item.id==url[2])[0] || {};
        res.statusCode = data.id==undefined?404:200;
    }
    res.data = data;
      log.byCode(`GET ${res.statusCode} ${url}`, res.statusCode);
      return res;
  }

  post (url, method, res,requestBody) {
    let data = {};
    res.statusCode = 404;
    if (null != url && url[1] === this.name) {
        let newData = JSON.parse(requestBody);
        newData.id = id++;
        this.data.push(newData);
        data = newData;
        res.statusCode = 200;
      } else {
        data = {error: 'POST Not supported yet. Stay tuned.'};
        res.statusCode = 404;
      }
    res.data = data;
          log.byCode(`POST ${res.statusCode} ${url}`, res.statusCode);
      return res;
  }

  delete (url, method, res) {
    let data = {};
    res.statusCode = 404;

    if (null == url || url[1] === '' || (url[1] === this.name && url[2] == '')) {
      res.statusCode = 404
    } else if (url[1] === this.name && url[2] != '') {
      data = this.data.filter( item => item.id==url[2])[0] || {};
      this.data = this.data.filter( item => item.id!=url[2]);
      res.statusCode = data.id==undefined?404:200;;
    }
    res.data = data;
          log.byCode(`DELETE ${res.statusCode} ${url}`, res.statusCode);
      return res;
  }

  put (url, method, res, requestBody) {
    let data = {};
    res.statusCode = 404;
    if (null != url && url[1] === this.name && url[2] != '') {
        data = this.data.filter( item => item.id==url[2])[0] || {};
        if (data.id != undefined) {
              let newData = JSON.parse(requestBody);
              this.data = this.data.filter( item => item.id!=url[2]);
              newData.id = parseInt(url[2]);
              this.data.push(newData);
              data = newData;
        }
        res.statusCode = data.id==undefined?404:200;
    }
    res.data = data;
    log.byCode(`PUT ${res.statusCode} ${url}`, res.statusCode);
      return res;
  }



}

module.exports=new RequestHandler();
