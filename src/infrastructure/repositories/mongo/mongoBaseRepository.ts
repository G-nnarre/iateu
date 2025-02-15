import { BaseEntity } from "@/core/entities/baseEntity";
import { BaseRepository } from "@/core/repositories/baseRepository";
import { Collection, Db, Filter, ObjectId, OptionalUnlessRequiredId } from "mongodb";

export class MongoBaseRepository<T extends BaseEntity> implements BaseRepository<T> {
  protected collection: Collection<T>;

  constructor(mongoDb:Db, collectionName: string){
    this.collection = mongoDb.collection<T>(collectionName);
  }

  async create(entity: Omit<T, "id">): Promise<T> {
    const newEntity = {...entity, id: new ObjectId().toString()} as T;
    await this.collection.insertOne(newEntity as OptionalUnlessRequiredId<T>);
    return newEntity;
  }
  async findById(id: string): Promise<T | null> {
    if (!ObjectId.isValid(id)) {
      return null;
    }
  
    const result = await this.collection.findOne({ _id: new ObjectId(id) } as unknown as Filter<T>);
  
    if (!result) return null;
  
    const { _id, ...rest } = result;
    return { ...rest, id: _id.toString() } as unknown as T;
  }
  async findAll(): Promise<T[]> {
    const results = await this.collection.find().toArray();
  
    return results.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toString(),
    } as unknown as T));
  }
  

  async update(id: string, updateData: Partial<T>): Promise<void> {
    await this.collection.updateOne({ _id: new ObjectId(id) } as unknown as Filter<T>, { $set: updateData });
  }

  async delete(id: string): Promise<void> {
    await this.collection.deleteOne({ _id: new ObjectId(id) } as unknown as Filter<T>);
  }

  async exists(id: string): Promise<boolean> {
    return (await this.collection.findOne({ _id: new ObjectId(id) } as unknown as Filter<T>)) !== null;
  }
  
}