// streams
// Readable, Writable, Transform, Duplex

const fs = require('fs');
const zlib = require('zlib');

const input = fs.createReadStream(__filename, {
  highWaterMark: 100,
});
const gzip = zlib.createGzip();
const output = fs.createWriteStream(`${__filename}.gzip`);

input.pipe(gzip).pipe(output);

// fs.readFileSync();
// fs.readFile(__filename, (err, content) => {
//   console.log(content);
// });

// paused | flowing
// 1. stream.pipe(fs.createWriteStream(`${__filename}.copy`));

// stream.on('data', chunk => {
//   console.log(chunk);
// });

// stream.resume(); | stream.pause();

stream.on('error', (err) => {});

// // 'end' - Readable, 'finish' - Writable
// gzip.on('end', () => {});
// gzip.on('finish', () => {});

input.on('end', () => console.log('input end'));
input.on('finish', () => console.log('input finish'));

gzip.on('end', () => console.log('gzip end'));
gzip.on('finish', () => console.log('gzip finish'));

output.on('end', () => console.log('output end'));
output.on('finish', () => console.log('output finish'));

input.on('close', () => console.log('input close'));
gzip.on('close', () => console.log('gzip close'));
output.on('close', () => console.log('output close'));
