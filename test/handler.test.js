const expect = require('expect');
const requestHandler = require('../requestHandler');


describe('Request Handler class basic test', () => {
  it('Should exist', () => {
    expect(requestHandler).toBeTruthy();
  });

  it('Method call works', () => {
    expect(requestHandler.say()).toBe('it works');
  });

})
