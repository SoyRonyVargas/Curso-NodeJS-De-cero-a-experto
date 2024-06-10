import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { TodoRepository } from "../../domain/repositories/todo.repository";


export class TodosController {

    constructor(
        private readonly todoRepository: TodoRepository
    ){}

    public getTodos = async ( req: Request , res: Response ) => {

        const todos = await this.todoRepository.getAll()

        res.json({
            data: todos
        })

    }
    
    public getTodoByID = async ( req: Request , res: Response ) => {

        try {
            
            const id = Number(req.params.id)

            const todo = await this.todoRepository.findById(id)
    
            if( !todo ) return res.status(404).json({
                msg: 'No encontrado'
            })
    
            return res.json({
                data: todo
            })

        }
        catch (error) 
        {
            return res.json(error).status(500)    
        }

    }

    public createTodo = async ( req : Request , res: Response ) => {

        try 
        {
            
            const { text, completedAt } = req.body

            const user = await this.todoRepository.create({
                text,
                completedAt
            })
            
            return res.json({
                msg: 'Created',
                data: user 
            })

        } 
        catch (error) 
        {
            return res.json(error).status(500)    
        }

    }
    
    public updateTodo = async ( req : Request , res: Response ) => {

        const id = Number(req.params.id)

        const todo = await this.todoRepository.findById(id)

        if( !todo ) return res.status(404).json({
            msg: 'No encontrado'
        })

        const updatedTodo = await this.todoRepository.updateById({
            ...req.body
        })

        return res.json({
            msg: 'updated',
            data: updatedTodo
        })

    }
    
    public deleteTodo = async ( req : Request , res: Response ) => {

        try {
            
            const id = (+req.params.id)

            const todo = await this.todoRepository.findById(id)

            if( !todo ) return res.status(404).json({
                msg: 'No encontrado'
            })

            const updatedTodo = await this.todoRepository.deleteById(id)

            return res.json({
                msg: 'ELIMINADO',
                data: updatedTodo
            })

        } 
        catch (error) 
        {
            return res.status(500).json(error)
        }

    }

}