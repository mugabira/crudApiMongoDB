import { establishMongoConnection } from '@/util/mongo';
import { createDog } from './create-dog';
import { deleteDog } from './delete-dog';
import { getDog } from './get-dog';
import { Dog } from './schema';
import { updateDog } from './update-dog';

beforeAll(async () => {
  await establishMongoConnection();
});

afterEach(async () => {
  await Dog.deleteMany({});
});

describe('Dog CRUD Operations', () => {
  const testDogData = {
    name: 'Rex',
    breed: 'German Shepherd',
    color: 'Black and Tan',
    weight: 75,
  };

  let createdDogId: string;

  beforeEach(async () => {
    // Create a test dog before each test
    const result = await createDog(
      testDogData.name,
      testDogData.breed,
      testDogData.color,
      testDogData.weight,
    );
    createdDogId = result!.id;
  });

  describe('createDog', () => {
    it('creates a new dog record', async () => {
      const newDogData = {
        name: 'Buddy',
        breed: 'Golden Retriever',
        color: 'Golden',
        weight: 65,
      };

      const result = await createDog(
        newDogData.name,
        newDogData.breed,
        newDogData.color,
        newDogData.weight,
      );
      expect(result).toMatchObject(newDogData);

      const doc = await Dog.findById(result!.id);
      expect(doc).toMatchObject(newDogData);
    });
  });

  describe('getDog', () => {
    it('retrieves an existing dog', async () => {
      const dog = await getDog(createdDogId);
      expect(dog).toMatchObject(testDogData);
    });

    it('returns undefined for non-existent dog', async () => {
      const dog = await getDog('507f1f77bcf86cd799439011'); // Random non-existent ID
      expect(dog).toBeUndefined();
    });
  });

  describe('updateDog', () => {
    it('updates an existing dog', async () => {
      const updates = {
        name: 'Rex Updated',
        weight: 80,
      };

      const updatedDog = await updateDog(createdDogId, updates);
      expect(updatedDog).toMatchObject({
        ...testDogData,
        ...updates,
      });

      const doc = await Dog.findById(createdDogId);
      expect(doc).toMatchObject(updates);
    });

    it('returns undefined for non-existent dog', async () => {
      const result = await updateDog('507f1f77bcf86cd799439011', {
        name: 'No Dog',
      });
      expect(result).toBeUndefined();
    });
  });

  describe('deleteDog', () => {
    it('deletes an existing dog', async () => {
      const deletedDog = await deleteDog(createdDogId);
      expect(deletedDog).toMatchObject(testDogData);

      const doc = await Dog.findById(createdDogId);
      expect(doc).toBeNull();
    });

    it('returns undefined for non-existent dog', async () => {
      const result = await deleteDog('507f1f77bcf86cd799439011');
      expect(result).toBeUndefined();
    });
  });
});
