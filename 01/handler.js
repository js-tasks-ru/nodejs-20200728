let i = 0;

const obj = {};

function handler(req, res) {
  console.log('request');
  
  obj[Date.now()] = (new Array(100000).fill('*'));
  
  i++;
  res.end(i.toString());
}

module.exports = handler;
