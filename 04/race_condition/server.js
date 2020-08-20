const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);
  const filepath = path.join(__dirname, 'files', pathname);

  // 'GET', 'DELETE'
  // task queue: ['get', 'delete']
  // 1. get -> ['delete', 'exists']
  // 2. delete -> ['exists', 'unlink']
  // 3. exists -> ['unlink', 'createReadStream']
  // 4. unlink -> ['createReadStream']
  // 5. createReadStream -> error
  switch (req.method) {
    case 'GET':
      // fs.exists(filepath, (exists) => {
      //   if (!exists) {
      //     res.statusCode = 404;
      //     res.end('not found');
      //     return;
      //   }
        
      //   fs.createReadStream(filepath).pipe(res);
      // });
      fs
        .createReadStream(filepath)
        .on('error', err => {
          if (err.code === 'ENOENT') {
            res.statusCode = 404;
            res.end('not found');
          } else {
            res.statusCode = 500;
            res.end('internal server error');
          }
        })
        .pipe(res);
      break;

    case 'DELETE':
      fs.unlink(filepath, (err) => {
        if (err.code === 'ENOENT') {
          res.statusCode = 404;
          res.end('not found');
        } else {
          res.end('ok');
        }
      });
      break;
    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

server.listen(3000, () => {
  console.log('server is listening on http://localhost:3000');
});
