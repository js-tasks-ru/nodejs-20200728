const assert = require('assert');

class Shop {
  sellBeer(age, time, beer) {
    assert.ok(age >= 18, 'can not be less than 18');
    assert.ok(time > 22 && time < 10, 'not in timeframe');

    return beer;
  }
}
