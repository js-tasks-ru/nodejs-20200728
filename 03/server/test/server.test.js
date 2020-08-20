const server = require('../server');
const axios = require('axios');
const assert = require('assert');

/**
 * 1. launch server
 * 2. make request (with "message")
 * 3. check server response
 * 4. terminate server
 */

describe('server tests', () => {
  before((done) => {
    server.listen(3000, done);
  });
  
  after((done) => {
    server.close(done);
  });

  it('with message', async () => {
    const message = 'hello world';
    const response = await axios.post('http://localhost:3000', { message });
    assert.strictEqual(response.data, message);
  });
  
  it('without message', async () => {
    const response = await axios.post('http://localhost:3000', { foo: 'bar' }, {
      validateStatus: _ => true,
    });
    assert.strictEqual(response.data, '"message" must be provided');
    assert.strictEqual(response.status, 400);
  });
});
