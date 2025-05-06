import Hapi, { Request, ResponseToolkit } from '@hapi/hapi';
import { routes } from './routes';

const server = Hapi.server({
  port: process.env.PORT || 80,
});

(async () => {
  await routes(server);
  await server.start();
})();
