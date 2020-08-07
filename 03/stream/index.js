const IncrementStream = require('./IncrementStream');

const inc = new IncrementStream();

inc.on('data', chunk => console.log(chunk));

inc.write(1);
inc.write(2);
inc.write(3);
inc.write(4);

inc.end();
