import { Server } from '@hapi/hapi';
import things from './things';

export const routes = async (server: Server) => {
  await server.register(things, {
    routes: { prefix: '/v1.0/things' },
  });
};
