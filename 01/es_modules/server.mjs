import http from 'http';
import handler from './handler.mjs';

const server = new http.Server();

server.on('request', handler);

server.on('connection', () => {
  console.log('connection');
});

server.listen(3000);
