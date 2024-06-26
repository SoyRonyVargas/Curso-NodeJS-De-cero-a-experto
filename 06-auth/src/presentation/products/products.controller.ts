import { CreateProductDTO } from "../../domain/dtos/products/create-product.dto"
import { PaginationDTO } from "../../domain/dtos/shared/pagination.dto"
import { CustomError } from "../../domain/errors/custom.error"
import { ProductService } from "../services/product.service"
import { Request, Response } from "express"


export class ProductsController {

    constructor(
        private readonly productsService: ProductService    
    ){

    }

    public getAllProducts = async ( _ : Request , res: Response ) => {

        try  
        {
            
            const { page = 1 , limit = 10 } = _.query

            const [ error , paginationDTO ] = await PaginationDTO.create( +page , +limit )

            if( error ) throw CustomError.badRequest('Error de query')

            const data = await this.productsService.getAll(paginationDTO!)   

            return res.json({
                data
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
        
            const [ error , productDTO ] = CreateProductDTO.create(req.body)

            if( error ) throw CustomError.badRequest(`${error}`)

            const result = await this.
                productsService
                .create( productDTO! )
            
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