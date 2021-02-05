import hapi from '@hapi/hapi';
import path from 'path';
import inert from '@hapi/inert';
import vision from '@hapi/vision';
import pug from 'pug';
import router from './routes';

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const routes: hapi.RouteOptions = {
  files: {
    relativeTo: path.join(__dirname, '..', 'public'),
  },
};

const init = async () => {
  const server = hapi.server({ port, host, routes });

  await server.register(inert);
  await server.register(vision);

  server.state('user', {
    ttl: 1000 * 60 * 20,
    isSecure: process.env.NODE_ENV === 'production',
    encoding: 'base64json',
  });

  server.views({
    engines: { pug },
    relativeTo: path.join(__dirname, '..'),
    path: 'views',
  });

  server.route(router);

  await server.start();
  console.log(`Server online on port: ${server.info.port}`);
};

export { init };
