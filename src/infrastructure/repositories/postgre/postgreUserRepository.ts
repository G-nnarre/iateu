import { Knex } from "knex";
import { PostgreBaseRepository } from "./postgreBaseRepository";
import { User } from "@/core/entities/user/user";
import { UserRepository } from "@/core/repositories/userRepository";

export class PostgreUserRepository extends PostgreBaseRepository<User> implements UserRepository {
  constructor(db: Knex) {
    super(db, 'user');
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.table.where({ email }).first() || null;
  }
}