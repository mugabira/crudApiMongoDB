import { Server } from '@hapi/hapi';
import { establishMongoConnection } from '@/util/mongo';
import { Dog } from '../../dog/schema';
import { createDogHandler } from './create-dog';
import { deleteDogHandler } from './delete-dog';
import { getDogHandler } from './get-dog';

const server = new Server();

beforeAll(async () => {
  await establishMongoConnection();

  server.route([
    {
      method: 'POST',
      path: '/dogs',
      options: {
        handler: createDogHandler,
      },
    },
    {
      method: 'DELETE',
      path: '/dogs/{id}',
      options: {
        handler: deleteDogHandler,
      },
    },
    {
      method: 'GET',
      path: '/dogs/{id}',
      options: {
        handler: getDogHandler,
      },
    },
  ]);
  await server.start();
});

describe('DELETE /dogs/{id} - deleteDogHandler', () => {
  let createdDogId: string;

  beforeEach(async () => {
    const res = await server.inject({
      method: 'POST',
      url: '/dogs',
      payload: {
        name: 'Charlie',
        breed: 'Poodle',
        color: 'Black',
        weight: 20,
      },
    });
    createdDogId = JSON.parse(res.payload).id;
  });

  it('should delete an existing dog', async () => {
    // First verify the dog exists
    const getRes = await server.inject({
      method: 'GET',
      url: `/dogs/${createdDogId}`,
    });
    expect(getRes.statusCode).toBe(200);

    // Delete the dog
    const deleteRes = await server.inject({
      method: 'DELETE',
      url: `/dogs/${createdDogId}`,
    });
    expect(deleteRes.statusCode).toBe(200);

    // Verify the dog no longer exists
    const getAfterDeleteRes = await server.inject({
      method: 'GET',
      url: `/dogs/${createdDogId}`,
    });
    expect(getAfterDeleteRes.statusCode).toBe(404);
  });

  it('should return 404 for non-existent dog', async () => {
    const nonExistentId = '507f1f77bcf86cd799439011';
    const res = await server.inject({
      method: 'DELETE',
      url: `/dogs/${nonExistentId}`,
    });

    expect(res.statusCode).toBe(404);
  });
});

afterAll(async () => {
  await Dog.deleteMany({});
  await server.stop();
});
