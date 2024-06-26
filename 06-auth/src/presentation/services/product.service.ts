import { ProductModel } from "../../data/mongo/models/product.model";
import { CreateProductDTO } from "../../domain/dtos/products/create-product.dto";
import { PaginationDTO } from "../../domain/dtos/shared/pagination.dto";
import { CustomError } from "../../domain/errors/custom.error";

export class ProductService {

    public async getAll( paginationDTO: PaginationDTO ) {

        try {
            
            const {
                limit,
                page
            } = paginationDTO

            let products = await ProductModel.find()
                .skip( (page - 1) * limit )
                .limit( limit )
                .populate('user')
                .populate('category')

            // let map = products.map( (obj:any) => ({
            //     id: obj.id,
            //     // ...obj,
            //     ...obj._doc
            // }))

            return products

        } 
        catch (error) 
        {
            throw CustomError.serverError(`${error}`)
        }

    }

    public async create( createProductDTO:CreateProductDTO ){

        try 
        {
        
            const exist = await ProductModel.findOne({
                name: createProductDTO.name
            })

            if( exist ) throw CustomError.badRequest('Product already exist')

            const registro = new ProductModel({
                ...createProductDTO,
                // user: user
            })          
          
            await registro.save()            
          
            return {
                id: registro.id
            }
            
        } 
        catch (error) 
        {
            throw CustomError.serverError(`${error}`)   
        }

    }

}