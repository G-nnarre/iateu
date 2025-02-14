import { User } from "@/core/entities/user/user";
import { MongoBaseRepository } from "./mongoBaseRepository";
import { UserRepository } from "@/core/repositories/userRepository";
import { Db } from "mongodb";

export class MongoUserRepository extends MongoBaseRepository<User> implements UserRepository{
  constructor(mongoDb: Db){
    super(mongoDb,'user');
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.collection.findOne({ email });
  }
}