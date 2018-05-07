const expect = require('expect');
const http = require('http');
const fs = require('fs');
const miniapi = require('../miniapi');
const PORT = 3200;
const GET_URL = `http://localhost:${PORT}`;
const DATA = [ { id: 1, name: 'Bob' }, { id: 2, name: 'Alice' } ];
const FILE = './sample.test.json';

fs.writeFileSync(FILE, JSON.stringify(DATA));

describe('basic tests working', () => {
  afterEach(() => {
		miniapi.stop;
		miniapi.persist = false;
	});

  it('should not be null', () => {
    expect(miniapi).toBeTruthy();
  });

  it('should return version', () => {
    expect(miniapi.version()).toBe('1.0');
  });

  it('should return initial data', () =>{
    expect(miniapi.getData()).toBeTruthy();
  });

  it('should set name correctly',  () => {
      miniapi.withName('user');
      expect(miniapi.getName()).toBe('user');
  });

  it('should set port correctly', () => {
    miniapi.withPort(PORT);
    expect(miniapi.getPort()).toBe(PORT);
  });

  it('should set content-type correctly', () => {
    miniapi.withContentType('application/json');
    expect(miniapi.getContentType()).toBe('application/json');
  });

  it('should set id correcty', () => {
    miniapi.withId('id');
    expect(miniapi.getId()).toBe('id');
  });

  it('should load contents from file', () => {
	miniapi.withDataFrom('./sample.test.json');
	expect(miniapi.getData().length).toBe(2);
  });

  it('should have default persist to false', () => {
	 expect(miniapi.getPersist()).toBe(false);
	});
  
  it('should set persist to true', () => {
	 miniapi.withPersist();
	 expect(miniapi.getPersist()).toBe(true);
	});
});

describe('web server testing', () => {
  it('it is opened', (done) => {
    miniapi.withPort(PORT).withData(DATA).start();
    http.get(GET_URL, () => {
        done();
        miniapi.stop();
    });
  });

  it('should return 200 code', (done) => {
    miniapi.withPort(PORT).withData(DATA).start();
    http.get(GET_URL, (resp) => {
      expect(resp.statusCode).toBe(200);
      done();
      miniapi.stop();
    });
  });

  it('it should return json data', (done) => {
    miniapi.withPort(PORT).withData(DATA).start();
    http.get(GET_URL, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        apiData = JSON.parse(data);
        expect(apiData.length).toBe(DATA.length);
        expect(apiData[0].name).toBe('Bob');
        done();
        miniapi.stop();
      });
    });
  });
});

describe('persist mode testing', () => {
	it('should store and restore data correctly', (done) => {
    let payload = JSON.stringify({ name:  'Node persists'});
    miniapi.withPort(PORT).withDataFrom('./sample.test.json').withPersist().start();
    http.request({
      host: 'localhost',
      port: PORT,
      path: '/user/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (resp) => {
     let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        expect(JSON.parse(data)).toEqual({ id: 3, name:  'Node persists'});
        expect(resp.statusCode).toBe(200);
		const d = JSON.parse(fs.readFileSync(FILE));
		expect(d.length).toEqual(3);
        done();
        miniapi.stop();
      });
    }).write(payload);


	});
});

describe('GET API testing', () => {
  it('should return default data with /', (done) => {
    miniapi.withPort(PORT).withData(DATA).start();
    http.get(`${GET_URL}/`, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        apiData = JSON.parse(data);
        expect(apiData.length).toBe(DATA.length);
        expect(apiData[0].name).toBe('Bob');
        expect(resp.statusCode).toBe(200);
        done();
        miniapi.stop();
      });
    });
  });

  it('should return default data with /user', (done) => {
    miniapi.withPort(PORT).withData(DATA).start();
    http.get(`${GET_URL}/user`, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        apiData = JSON.parse(data);
        expect(apiData.length).toBe(DATA.length);
        expect(apiData[0].name).toBe('Bob');
        expect(resp.statusCode).toBe(200);
        done();
        miniapi.stop();
      });
    });
  });

  it('should return default data with /user/', (done) => {
    miniapi.withPort(PORT).withData(DATA).start();
    http.get(`${GET_URL}/user/`, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        apiData = JSON.parse(data);
        expect(apiData.length).toBe(DATA.length);
        expect(apiData[0].name).toBe('Bob');
        expect(resp.statusCode).toBe(200);
        done();
        miniapi.stop();
      });
    });
  });

  it('should return default data with /user/1', (done) => {
    miniapi.withPort(PORT).withData(DATA).start();
    http.get(`${GET_URL}/user/1`, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        expect(JSON.parse(data)).toEqual(DATA[0]);
        expect(resp.statusCode).toBe(200);
        done();
        miniapi.stop();
      });
    });
  });

  it('should return {}  with /user/6345213', (done) => {
    miniapi.withPort(PORT).withData(DATA).start();
    http.get(`${GET_URL}/user/6345213`, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        expect(JSON.parse(data)).toEqual({});
        expect(resp.statusCode).toBe(404);
        done();
        miniapi.stop();
      });
    });
  });
});

describe('POST testing', () => {
  it('should add data', (done) => {
    let payload = JSON.stringify({ name:  'Node rules'});
    miniapi.withPort(PORT).withData(DATA).start();
    http.request({
      host: 'localhost',
      port: PORT,
      path: '/user/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (resp) => {
     let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        expect(JSON.parse(data).name).toEqual('Node rules');
        expect(resp.statusCode).toBe(200);
        done();
        miniapi.stop();
      });
    }).write(payload);
  });

  it('should add data, trailing slash', (done) => {
    let payload = JSON.stringify({ name:  'Node rules'});
    miniapi.withPort(PORT).withData(DATA).start();
    http.request({
      host: 'localhost',
      port: PORT,
      path: '/user',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (resp) => {
     let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        expect(JSON.parse(data).name).toEqual('Node rules');
        expect(resp.statusCode).toBe(200);
        done();
        miniapi.stop();
      });
    }).write(payload);
  });
});


describe('DELETE testing', () => {
  it('should delete data', (done) => {
    payload = JSON.stringify({});
    miniapi.withPort(PORT).withData(DATA).start();
    http.request({
      host: 'localhost',
      port: PORT,
      path: '/user/1',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (resp) => {
     let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        expect(JSON.parse(data)).toEqual(DATA[0]);
        expect(resp.statusCode).toBe(200);
        done();
        miniapi.stop();
      });
    }).write(payload);
  });

  it('should NOT delete data', (done) => {
    payload = JSON.stringify({});
    miniapi.withPort(PORT).withData(DATA).start();
    http.request({
      host: 'localhost',
      port: PORT,
      path: '/user/456343',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (resp) => {
     let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        expect(JSON.parse(data)).toEqual({});
        expect(resp.statusCode).toBe(404);
        done();
        miniapi.stop();
      });
    }).write(payload);
  });
});

describe('PUT testing', () => {
  it('should change data', (done) => {
    let payload = JSON.stringify({ name:  'Name changed'});
    miniapi.withPort(PORT).withData(DATA).start();
    http.request({
      host: 'localhost',
      port: PORT,
      path: '/user/1',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (resp) => {
     let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        expect(JSON.parse(data)).toEqual({ id: 1, name:  'Name changed'});
        expect(resp.statusCode).toBe(200);
        done();
        miniapi.stop();
      });
    }).write(payload);
  });
});

describe('PATCH testing, just as the PUT', () => {
  it('Should change the entry', (done)=> {
    let payload = JSON.stringify({ name:  'Name changed'});
    miniapi.withPort(PORT).withData(DATA).start();
    http.request({
      host: 'localhost',
      port: PORT,
      path: '/user/1',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (resp) => {
     let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        expect(JSON.parse(data)).toEqual({ id: 1, name:  'Name changed'});
        expect(resp.statusCode).toBe(200);
        done();
        miniapi.stop();
      });
    }).write(payload);
  });
});
