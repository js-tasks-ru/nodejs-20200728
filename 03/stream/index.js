const IncrementStream = require('./IncrementStream');

const inc = new IncrementStream();

inc.on('data', chunk => console.log(chunk));

inc.write(1); // 2
inc.write(2); // 3
inc.write(3); // 4
inc.write(4); // 5

inc.write(10); // no 'data'
inc.write(5); // 16

inc.end();

/**
 * unit
 * functional
 * e2e/integrational
 * 
 * 
 */