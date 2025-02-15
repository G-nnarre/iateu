import { BaseEntity } from "@/core/entities/baseEntity";
import { BaseRepository } from "@/core/repositories/baseRepository";
import { Knex } from "knex";

export class PostgreBaseRepository<T extends BaseEntity> implements BaseRepository<T> {
  protected db: Knex;
  protected tableName: string;

  constructor(db: Knex, tableName: string) {
    this.db = db;
    this.tableName = tableName;
  }

  protected get table() {
    return this.db(this.tableName);
  }

  async create(entity: Omit<T, "id">): Promise<T> {
    const [newEntity] = await this.table
      .insert(entity)
      .returning("*");
    return newEntity as T;
  }
  

  async findById(id: string): Promise<T | null> {
    return this.table.where({ id }).first() || null;
  }

  async findAll(): Promise<T[]> {
    return this.table.select("*");
  }

  async update(id: string, updateData: Partial<T>): Promise<void> {
    await this.table.where({ id }).update(updateData);
  }

  async delete(id: string): Promise<void> {
    await this.table.where({ id }).del();
  }

  async exists(id: string): Promise<boolean> {
    const result = await this.table.where({ id }).select("id").first();
    return !!result;
  }
}
