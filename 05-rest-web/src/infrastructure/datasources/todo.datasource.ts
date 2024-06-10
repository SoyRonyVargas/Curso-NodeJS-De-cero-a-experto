import { prisma } from "../../data/postgres";
import { TodoDataSource } from "../../domain/datasources/todo.datasource";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos/todos.dto";
import { TodoEntity } from "../../domain/entities/todo.entity";

export class TodoDataSourceImplementation implements TodoDataSource {
    
    async create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
        
        const updatedTodo = await prisma.todo.create({
            data: createTodoDTO
        })

        return TodoEntity.fromObject(updatedTodo)

    }
    
    async getAll(): Promise<TodoEntity[]> {
        
        const todos = await prisma.todo.findMany();

        return todos.map( t => TodoEntity.fromObject(t) );

    }

    async findById(id: number): Promise<TodoEntity> {
        
        const todo = await prisma.todo.findFirst({
            where: {
                id
            } 
        });

        if( !todo ) throw 'No encontrado'

        return TodoEntity.fromObject(todo);

    }

    async updateById( updateTodoDTO: UpdateTodoDTO ): Promise<TodoEntity> {

        const updatedTodo = await prisma.todo.update({
            where: {
                id: updateTodoDTO.id
            },
            data: updateTodoDTO
        })

        return TodoEntity.fromObject(updatedTodo)

    }
    
    async deleteById(id: number): Promise<TodoEntity> {
        
        const deletedTodo = await prisma.todo.delete({
            where: {
                id
            },
        })

        return TodoEntity.fromObject(deletedTodo)

    }

}