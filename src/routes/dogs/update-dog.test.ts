import { Server } from '@hapi/hapi';
import { establishMongoConnection } from '@/util/mongo';
import { Dog } from '../../dog/schema';
import { createDogHandler } from './create-dog';
import { updateDogHandler } from './update-dog';

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
      method: 'PATCH',
      path: '/dogs/{id}',
      options: {
        handler: updateDogHandler,
      },
    },
  ]);
  await server.start();
});

describe('PATCH /dogs/{id} - updateDogHandler', () => {
  let createdDogId: string;

  beforeEach(async () => {
    const res = await server.inject({
      method: 'POST',
      url: '/dogs',
      payload: {
        name: 'Rocky',
        breed: 'Bulldog',
        color: 'White',
        weight: 50,
      },
    });
    createdDogId = JSON.parse(res.payload).id;
  });

  it('should update a dog with valid payload', async () => {
    const updates = {
      name: 'Rocky Updated',
      weight: 55,
    };

    const res = await server.inject({
      method: 'PATCH',
      url: `/dogs/${createdDogId}`,
      payload: updates,
    });

    expect(res.statusCode).toBe(200);
    const response = JSON.parse(res.payload);
    expect(response.name).toBe(updates.name);
    expect(response.weight).toBe(updates.weight);
  });

  it('should return 400 for invalid update data', async () => {
    const invalidUpdates = {
      weight: -10, // Invalid negative weight
    };

    const res = await server.inject({
      method: 'PATCH',
      url: `/dogs/${createdDogId}`,
      payload: invalidUpdates,
    });

    expect(res.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await Dog.deleteMany({});
  await server.stop();
});
