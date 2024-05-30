import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodosRouter } from "./todos/routes";

export class AppRouter {

    static get routes(): Router {

        const router = Router()

        router.use( '/todos' , TodosRouter.routes )

        return router;

    }

}