import { CreateTodoDTO, UpdateTodoDTO } from "../dtos/todos.dto";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoRepository {
    
    abstract updateById( updateTodoDTO: UpdateTodoDTO ): Promise<TodoEntity>
    abstract create( createTodoDTO: CreateTodoDTO ): Promise<TodoEntity>
    abstract deleteById( id: number ): Promise<TodoEntity>
    abstract findById( id: number ): Promise<TodoEntity>
    abstract getAll(): Promise<TodoEntity[]>
    
}