import { Dog } from './schema';

export const getDog = async (dogId: string) => {
  const dog = await Dog.findById(dogId);
  if (!dog) {
    return;
  }
  return {
    id: dog.id,
    name: dog.name,
    breed: dog.breed,
    color: dog.color,
    weight: dog.weight,
  };
};
