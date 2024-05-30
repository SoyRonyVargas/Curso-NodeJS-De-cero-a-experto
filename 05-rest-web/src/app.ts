import { AppRouter } from "./presentation/routes";
import { Server } from "./presentation/server";
import { envs } from "./config/envs";

( () => {

    main()

})()

async function main(){

    const server = new Server()

    await server.start({
        PORT: envs.PORT,
        routes: AppRouter.routes
    })

}