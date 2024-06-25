import { Request, Response } from "express"
import { CustomError } from "../../domain/errors/custom.error"
import { CreateCategoryDTO } from "../../domain/dtos/category/create-category.dto"


export class CategoryController {

    public create = ( req : Request , res: Response ) => {

        const [ error , categoryCreated ] = CreateCategoryDTO.create(req.body)

        return res.status(200).json({ 
            error,
            categoryCreated
        })

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