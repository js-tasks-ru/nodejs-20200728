const fs = require('fs');

const fileStream = fs.createReadStream('release_cycle.jpg', {
  highWaterMark: 16000, // bytes
  // encoding: 'utf8'
});

const content = [];

fileStream.on('data', (chunk) => {
  content.push(chunk);
});

fileStream.on('end', () => {
  console.log(Buffer.concat(content).toString('base64'));
});
