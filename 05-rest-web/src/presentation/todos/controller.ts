import { Request, Response } from "express";


export class TodosController {

    constructor(){}

    public getTodos = ( req: Request , res: Response ) => {

        res.json([ 1 , 2 , 3 ])

    }
    
    public getTodoByID = ( req: Request , res: Response ) => {

        res.json([ 1 , 2 , 3 ])

    }


    public createTodo = ( req : Request , res: Response ) => {

        const body = req.body

        return res.json({
            msg: 'Created',
            body: body ?? 'Sexo'
        })

    }

}