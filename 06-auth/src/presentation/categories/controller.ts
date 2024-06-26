import { Request, Response } from "express"
import { CustomError } from "../../domain/errors/custom.error"
import { CreateCategoryDTO } from "../../domain/dtos/category/create-category.dto"
import { CategoryService } from "../services/category.service"
import { PaginationDTO } from "../../domain/dtos/shared/pagination.dto"


export class CategoryController {

    constructor(
        private categoryService: CategoryService
    ){

    }

    public allCategories = async ( _ : Request , res: Response ) => {

        try 
        {
            
            const { page = 1 , limit = 10 } = _.query

            const [ error , paginationDTO ] = await PaginationDTO.create( +page , +limit )

            console.log(paginationDTO);

            if( error ) throw CustomError.badRequest('Error de query')

            const categories = await this.categoryService.getCategories()   

            return res.json({
                data: categories
            })

        } 
        catch (error) 
        {
            return this.handleError(error, res)
        }

    }

    public create = async ( req : Request , res: Response ) => {

        try 
        {
        
            const [ error , categoryCreated ] = CreateCategoryDTO.create(req.body)

            if( error ) throw CustomError.badRequest(`${error}`)

            const result = await this.
                categoryService
                .createCategory( categoryCreated! , req.body.user.id)
            
            return res.status(200).json({ 
                data: result
            })

        } 
        catch (error) 
        {
            return this.handleError(error, res)
        }

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