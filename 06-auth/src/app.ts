import { MongoDatabase } from './data/mongo/mongo-database';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { envs } from './config/envs';

(async()=> {

  await main();

})();

async function main() {

  console.log('Iniciando servidor...');
  
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL 
  })

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  await server.start();

}