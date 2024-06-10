import { TodoDataSourceImplementation } from "../../infrastructure/datasources/todo.datasource";
import { TodoRepositoryImplementation } from "../../infrastructure/repositories/todo.repository";
import { TodosController } from "./controller";
import { Router } from "express";

export class TodosRouter {

    static get routes(): Router {

        const router = Router()

        const datasouce = new TodoDataSourceImplementation()
        const todoRepository = new TodoRepositoryImplementation(datasouce);

        const todoController = new TodosController(todoRepository)

        router.get('/' , todoController.getTodos )
        router.get('/:id' , todoController.getTodoByID )
        router.post('/' , todoController.createTodo )
        router.put('/:id' , todoController.updateTodo )
        router.delete('/:id' , todoController.deleteTodo )

        return router;

    }

}