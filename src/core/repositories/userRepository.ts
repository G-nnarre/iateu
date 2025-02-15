import { User } from "../entities/user/user";
import { BaseRepository } from "./baseRepository";

export interface UserRepository extends BaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
