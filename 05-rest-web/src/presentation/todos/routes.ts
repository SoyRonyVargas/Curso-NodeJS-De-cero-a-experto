import { TodosController } from "./controller";
import { Router } from "express";

export class TodosRouter {

    static get routes(): Router {

        const router = Router()

        const todoController = new TodosController()

        router.get('/' , todoController.getTodos )
        router.post('/' , todoController.createTodo )

        return router;

    }

}