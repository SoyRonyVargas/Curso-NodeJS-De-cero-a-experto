import { TodosController } from "./controller";
import { Router } from "express";

export class TodosRouter {

    static get routes(): Router {

        const router = Router()

        const todoController = new TodosController()

        router.get('/' , todoController.getTodos )
        router.get('/:id' , todoController.getTodoByID )
        router.post('/' , todoController.createTodo )
        router.put('/:id' , todoController.updateTodo )
        router.delete('/:id' , todoController.deleteTodo )

        return router;

    }

}