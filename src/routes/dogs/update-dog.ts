import Boom from '@hapi/boom';
import { Lifecycle } from '@hapi/hapi';
import { z } from 'zod';
import { updateDog } from '@/dog';

const paramsSchema = z.object({
  id: z.string().min(1),
});

const payloadSchema = z.object({
  name: z.string().min(1).optional(),
  breed: z.string().min(1).optional(),
  color: z.string().min(1).optional(),
  weight: z.number().positive().optional(),
});

export const updateDogHandler: Lifecycle.Method = async (request) => {
  let params;
  let payload;

  try {
    params = paramsSchema.parse(request.params);
    payload = payloadSchema.parse(request.payload);
  } catch (e: any) {
    throw Boom.badRequest('Validation error', e.issues);
  }

  try {
    const updatedDog = await updateDog(params.id, payload);
    if (!updatedDog) {
      throw Boom.notFound('Dog not found');
    }
    return updatedDog;
  } catch (e) {
    if (Boom.isBoom(e)) {
      throw e;
    }
    throw Boom.internal();
  }
};
