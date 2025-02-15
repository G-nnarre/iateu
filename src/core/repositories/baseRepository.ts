import { BaseEntity } from "../entities/baseEntity";

export interface BaseRepository<T extends BaseEntity> {
  create(entity: Omit<T, "id">): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, updateData: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
