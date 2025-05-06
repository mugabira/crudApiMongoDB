import { Dog } from './schema';

interface DogUpdateData {
  name?: string;
  breed?: string;
  color?: string;
  weight?: number;
}

export const updateDog = async (dogId: string, updateData: DogUpdateData) => {
  const dog = await Dog.findByIdAndUpdate(dogId, updateData, { new: true });

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
