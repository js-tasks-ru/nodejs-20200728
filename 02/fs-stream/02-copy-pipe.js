const fs = require('fs');

const fileIn = fs.createReadStream(__filename, {
  highWaterMark: 100,
});

const fileOut = fs.createWriteStream(__filename + '.copy', {
  highWaterMark: 100,
});

fileIn.on('data', chunk => {
  fileOut.write(chunk);
});

fileIn.once('end', () => {
  fileOut.end();
});

// fileIn.pipe(fileOut);
