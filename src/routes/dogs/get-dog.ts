import Boom from '@hapi/boom';
import { Lifecycle } from '@hapi/hapi';
import { z } from 'zod';
import { getDog } from '@/dog';

const paramsSchema = z.object({
  id: z.string().min(1),
});

export const getDogHandler: Lifecycle.Method = async (request) => {
  let params;
  try {
    params = paramsSchema.parse(request.params);
  } catch (e: any) {
    throw Boom.badRequest('Invalid dog ID', e.issues);
  }

  try {
    const dog = await getDog(params.id);
    if (!dog) {
      throw Boom.notFound('Dog not found');
    }
    return dog;
  } catch (e) {
    if (Boom.isBoom(e)) {
      throw e;
    }
    throw Boom.internal();
  }
};
