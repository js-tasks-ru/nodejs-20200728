const http = require('http');
const fs = require('fs');

const server = new http.Server();

// POST / body: {message: "hello world"} -> "hello world"
server.on('request', async (req, res) => {
  const body = [];
  
  // req.on('data', chunk => {
  //   body.push(chunk);
  // });
  
  // req.on('end', () => {
  //   const {message} = JSON.parse(Buffer.concat(body).toString());
  //   if (!message) {
  //     res.statusCode = 400;
  //     res.end('"message" must be provided');
  //   } else {
  //     res.end(message);
  //   }
  // });

  for await (const chunk of req) {
    body.push(chunk);
  }

  const {message} = JSON.parse(Buffer.concat(body).toString());
  if (!message) {
    res.statusCode = 400;
    res.end('"message" must be provided');
  } else {
    res.end(message);
  }
});

module.exports = server;
