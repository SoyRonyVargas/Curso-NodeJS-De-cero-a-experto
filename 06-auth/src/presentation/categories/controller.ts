import { Request, Response } from "express"
import { CustomError } from "../../domain/errors/custom.error"


export class CategoryController {

    public create = ( req : Request , res: Response ) => {

        return res.status(500).json({ error: 'Internal Server Error' })

    }

    private handleError = ( error : unknown , res: Response ) => {

        if( error instanceof CustomError ){

            return res.status(error.statusCode).json({
                error: error.message
            })

        }

        return res.status(500).json({ error: 'Internal Server Error' })

    }

}