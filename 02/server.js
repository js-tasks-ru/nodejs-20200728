const http = require('http');
const fs = require('fs');

const server = new http.Server();

// req - Readable, res - Writable
server.on('request', (req, res) => {
  // неправильно, надо использовать стримы!
  // fs.readFile(__filename, (err, content) => {
  //   res.end(content);
  // });

  const stream = fs.createReadStream(__filename);
  
  stream.on('error', (err) => {
    console.log(err);
    res.end('something went wrong');
  });
  
  stream.on('data', chunk => {
    const canWriteMore = res.write(chunk);
    if (!canWriteMore) {
      stream.pause();
      res.once('drain', () => {
        stream.resume();
      });
    }
  });
  
  stream.on('end', () => {
    res.end();
  });
  
  // stream.pipe(res);
});

server.listen(3000);
