import { Server } from '@hapi/hapi';
import { establishMongoConnection } from '@/util/mongo';
import { Dog } from '../../dog/schema';
import { createDogHandler } from './create-dog';

const server = new Server();

beforeAll(async () => {
  await establishMongoConnection();

  server.route({
    method: 'POST',
    path: '/dogs',
    options: {
      handler: createDogHandler,
    },
  });
  await server.start();
});

describe('POST /dogs - createDogHandler', () => {
  it('should create a new dog with valid payload', async () => {
    const payload = {
      name: 'Max',
      breed: 'Labrador',
      color: 'Golden',
      weight: 25,
    };

    const res = await server.inject({
      method: 'POST',
      url: '/dogs',
      payload,
    });

    expect(res.statusCode).toBe(200);
    const response = JSON.parse(res.payload);
    expect(response).toHaveProperty('id');
    expect(response).toMatchObject(payload);
  });

  it('should return 400 for invalid payload', async () => {
    const invalidPayload = {
      name: '', // Invalid empty string
      breed: 'Labrador',
      color: 'Golden',
      weight: -5, // Invalid negative weight
    };

    const res = await server.inject({
      method: 'POST',
      url: '/dogs',
      payload: invalidPayload,
    });

    expect(res.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await Dog.deleteMany({});
  await server.stop();
});
