import { Dog } from './schema';

export const createDog = async (
  name: string,
  breed: string,
  color: string,
  weight: number,
) => {
  const dog = new Dog({
    name,
    breed,
    color,
    weight,
  });

  await dog.save();

  return {
    id: dog.id,
    name: dog.name,
    breed: dog.breed,
    color: dog.color,
    weight: dog.weight,
  };
};
