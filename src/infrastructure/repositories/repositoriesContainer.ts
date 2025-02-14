import { UserRepository } from '@/core/repositories/userRepository';
import { MongoClient } from 'mongodb';
import { container } from 'tsyringe';
import { MongoUserRepository } from './mongo/mongoUserRepository';

if (process.env.MONGO_URI) {
  const mongoClient = new MongoClient(process.env.MONGO_URI);
  const mongoDb = mongoClient.db(process.env.MONGO_DBNAME);
  container.register<UserRepository>("UserRepository", { 
    useFactory: () => new MongoUserRepository(mongoDb)  
  });
// } else if (process.env.POSTGRE_URI) {
//   container.register<UserRepository>("UserRepository", { useClass: PostgreUserRepository });
// } else if (process.env.MYSQL_URI) {
//   container.register<UserRepository>("UserRepository", { useClass: MySQLUserRepository });
} else {
  throw new Error("No database configured. Set MONGO_URI or POSTGRE_URI.");
}



export { container as repositoriesContainer };