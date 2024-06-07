import { Request, Response } from "express";
import { prisma } from "../../data/postgres";


export class TodosController {

    constructor(){}

    public getTodos = async ( req: Request , res: Response ) => {

        const todos = await prisma.user.findMany()

        res.json({
            data: todos
        })

    }
    
    public getTodoByID = async ( req: Request , res: Response ) => {

        try {
            
            console.log('por id');
            console.log(req.params.id);
            

            const todo = await prisma.user.findFirst({
                where: {
                    id: +req.params.id
                }
            })
    
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

        const { text } = req.body

        const user = await prisma.user.create({
            data: {
                text
            }
        })

        return res.json({
            msg: 'Created',
            data: user 
        })

    }
    
    public updateTodo = async ( req : Request , res: Response ) => {

        const id = req.params.id

        const todo = await prisma.user.findFirst({
            where: {
                id: Number(id)
            }
        })

        if( !todo ) return res.status(404).json({
            msg: 'No encontrado'
        })

        const { text } = req.body

        const updatedTodo = await prisma.user.update({
            data: {
                text
            },
            where: {
                id: +id
            }
        })

        return res.json({
            msg: 'updated',
            data: updatedTodo
        })

    }
    
    public deleteTodo = async ( req : Request , res: Response ) => {

        try {
            
            const id = (+req.params.id)

            const todo = await prisma.user.findFirst({
                where: {
                    id
                }
            })

            if( !todo ) return res.status(404).json({
                msg: 'No encontrado'
            })

            const updatedTodo = await prisma.user.delete({
                where: {
                    id
                }
            })

            return res.json({
                msg: 'ELIMINADO',
                data: updatedTodo
            })

        } 
        catch (error) 
        {
            console.log(error);
            return res.status(501)
        }

    }

}