const http = require('http');
// const handler = require('./handler');

const server = new http.Server();

function handler(req, res) {
  // const date = Date.now();

  // while (Date.now() - date < 2000) {}

  // res.end('hello');
  setTimeout(() => {
    res.end('hello');
  }, 2000);
}

// request1, request2, request3
//    2s        2s        2s
// task queue: []
server.on('request', handler);

server.on('connection', () => {
  console.log('connection');
});

server.listen(3000);