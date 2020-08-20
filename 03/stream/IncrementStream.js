const stream = require('stream');

module.exports = class IncrementStream extends stream.Transform {
  constructor(options) {
    super({
      ...options,
      objectMode: true,
    });
    this.value = 0;
  }

  _transform(value, encoding, callback) {
    if (value >= 10) {
      this.value = value;
      setTimeout(() => callback(), 10);
    } else {
      const n = this.value + value + 1;
      this.value = 0;
      setTimeout(() => callback(null, n), 10);
    }
  }
};
