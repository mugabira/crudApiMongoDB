import { Server } from '@hapi/hapi';
import { establishMongoConnection } from '@/util/mongo';
import { Dog } from '../../dog/schema';
import { createDogHandler } from './create-dog';
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
      method: 'GET',
      path: '/dogs/{id}',
      options: {
        handler: getDogHandler,
      },
    },
  ]);
  await server.start();
});

describe('GET /dogs/{id} - getDogHandler', () => {
  let createdDogId: string;

  beforeEach(async () => {
    const res = await server.inject({
      method: 'POST',
      url: '/dogs',
      payload: {
        name: 'Bella',
        breed: 'Beagle',
        color: 'Tri-color',
        weight: 15,
      },
    });
    createdDogId = JSON.parse(res.payload).id;
  });

  it('should retrieve an existing dog', async () => {
    const res = await server.inject({
      method: 'GET',
      url: `/dogs/${createdDogId}`,
    });

    expect(res.statusCode).toBe(200);
    const response = JSON.parse(res.payload);
    expect(response.id).toBe(createdDogId);
    expect(response.name).toBe('Bella');
  });

  it('should return 404 for non-existent dog', async () => {
    const nonExistentId = '507f1f77bcf86cd799439011';
    const res = await server.inject({
      method: 'GET',
      url: `/dogs/${nonExistentId}`,
    });

    expect(res.statusCode).toBe(404);
  });
});

afterAll(async () => {
  await Dog.deleteMany({});
  await server.stop();
});
