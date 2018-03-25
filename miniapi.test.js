const expect = require('expect');
const http = require('http');
const miniapi = require('./miniapi');
const PORT = 3200;
const GET_URL = `http://localhost:${PORT}`;
const DATA = [ { id: 1, name: 'Swords' }, { id: 2, name: 'Sabres' } ];


describe('basic tests working', () => {
  it('should not be null', () => {
    expect(miniapi).toBeTruthy();
  });

  it('should return version', () => {
    expect(miniapi.version()).toBe('1.0');
  });

  it('should return initial data', () =>{
    expect(miniapi.getData()).toBeTruthy();
  });

  it('should set port correctly', () => {
    miniapi.withPort(PORT);
    expect(miniapi.getPort()).toBe(PORT);
  });

  it('should set content-type correctly', () => {
    miniapi.withContentType('application/json');
    expect(miniapi.getContentType()).toBe('application/json');
  });
});

describe('web server testing', () => {
  miniapi.withPort(PORT).withData(DATA).start();

  it('it is opened', (done) => {
    http.get(GET_URL, () => {
        done();
    });
  });

  it('should return 200 code', (done) => {
    http.get(GET_URL, (resp) => {
      expect(resp.statusCode).toBe(200);
      done();
    });
  });

  it('it should return json data', (done) => {
    http.get(GET_URL, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        apiData = JSON.parse(data);
        expect(apiData.length).toBe(DATA.length);
        expect(apiData[0].name).toBe('Swords');
        done();
      });
    });
  });
});
