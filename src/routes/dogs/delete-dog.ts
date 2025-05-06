import Boom from '@hapi/boom';
import { Lifecycle } from '@hapi/hapi';
import { z } from 'zod';
import { deleteDog } from '@/dog';

const paramsSchema = z.object({
  id: z.string().min(1),
});

export const deleteDogHandler: Lifecycle.Method = async (request) => {
  let params;
  try {
    params = paramsSchema.parse(request.params);
  } catch (e: any) {
    throw Boom.badRequest('Invalid dog ID', e.issues);
  }

  try {
    const deletedDog = await deleteDog(params.id);
    if (!deletedDog) {
      throw Boom.notFound('Dog not found');
    }
    return deletedDog;
  } catch (e) {
    if (Boom.isBoom(e)) {
      throw e;
    }
    throw Boom.internal();
  }
};
