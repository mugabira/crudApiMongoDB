import { Server } from '@hapi/hapi';
import { createDogHandler } from './create-dog';
import { deleteDogHandler } from './delete-dog';
import { getDogHandler } from './get-dog';
import { updateDogHandler } from './update-dog';

export const registerDogRoutes = (server: Server) => {
  server.route([
    {
      method: 'POST',
      path: '/dogs',
      handler: createDogHandler,
      options: {
        auth: {
          strategies: ['duAuth'],
          scope: ['myService:write:dog'],
        },
        tags: ['api', 'dogs'],
        description: 'Create a new dog',
      },
    },
    {
      method: 'GET',
      path: '/dogs/{id}',
      handler: getDogHandler,
      options: {
        auth: {
          strategies: ['duAuth'],
          scope: ['myService:read:thing'],
        },
        tags: ['api', 'dogs'],
        description: 'Get a dog by ID',
      },
    },
    {
      method: 'PATCH',
      path: '/dogs/{id}',
      handler: updateDogHandler,
      options: {
        auth: {
          strategies: ['duAuth'],
          scope: ['myService:write:thing'],
        },
        tags: ['api', 'dogs'],
        description: 'Update a dog',
      },
    },
    {
      method: 'DELETE',
      path: '/dogs/{id}',
      handler: deleteDogHandler,
      options: {
        auth: {
          strategies: ['duAuth'],
          scope: ['myService:write:thing'],
        },
        tags: ['api', 'dogs'],
        description: 'Delete a dog',
      },
    },
  ]);
};
