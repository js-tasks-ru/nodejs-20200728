const IncrementStream = require('../IncrementStream');
const assert = require('assert');
const sinon = require('sinon');

describe('increment stream', () => {
  it('should increment values', (done) => {
    const inc = new IncrementStream();
    const spy = sinon.spy();

    inc.on('data', spy);
    inc.on('end', () => {
      assert.strictEqual(spy.callCount, 3);
      
      assert.strictEqual(spy.getCall(0).args[0], 2);
      assert.strictEqual(spy.getCall(1).args[0], 16);
      assert.strictEqual(spy.getCall(2).args[0], 7);

      done();
    });

    inc.write(1); // 2
    inc.write(10); // no 'data'
    inc.write(5); // 16
    inc.write(6); // 7

    inc.end();
  });
});
