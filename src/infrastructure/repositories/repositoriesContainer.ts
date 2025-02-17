import { UserRepository } from '@/core/repositories/userRepository';
import { container } from 'tsyringe';

async function setupDatabase() {
  if (process.env.MONGO_URI) {
    const { MongoClient } = await import('mongodb');
    const { MongoUserRepository } = await import('./mongo/mongoUserRepository');
    
    const mongoClient = new MongoClient(process.env.MONGO_URI);
    const mongoDb = mongoClient.db(process.env.MONGO_DBNAME);
    container.register<UserRepository>("UserRepository", { 
      useFactory: () => new MongoUserRepository(mongoDb)  
    });
  } else if (process.env.POSTGRE_URI) {
    const knex = await import('knex');
    const { PostgreUserRepository } = await import('./postgre/postgreUserRepository');
    
    const knexDb = knex({ client: 'pg', connection: process.env.POSTGRE_URI });
    container.register<UserRepository>("UserRepository", { 
      useFactory: () => new PostgreUserRepository(knexDb)
    });
  } else {
    throw new Error("No database configured. Set MONGO_URI or POSTGRE_URI.");
  }
}

setupDatabase().catch((error) => {
  console.error("Error setting up database:", error);
});

export { container as repositoriesContainer };