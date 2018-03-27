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

    if (null == url || url[1] === '' || (url[1] == this.name && url[2] == '')) {
        data = this.data;
        res.statusCode = 200;
    } else if (url[1] === this.name && url[2] != '') {
        data = this.data.filter( item => item.id==url[2])[0] || {};
        res.statusCode = data.id==undefined?404:200;
    }
    res.data = data;
      return res;
  }

}

module.exports=new RequestHandler();
