import { CategoryModel } from "../../data/mongo/models/category.model";
import { CreateCategoryDTO } from "../../domain/dtos/category/create-category.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class CategoryService {

    // constructor(

    // ) {
        
    // }

    public async getCategories() {

        try {
            
            let categories = await CategoryModel.find()

            let mapcategories = categories.map( (cat) => ({
                id: cat.id,
                name: cat.name,
                available: cat.available
            }))

            return mapcategories

        } 
        catch (error) 
        {
            throw CustomError.serverError(`${error}`)
        }

    }

    public async createCategory( createCategoryDTO:CreateCategoryDTO , user: UserEntity ){

        try 
        {
        
            const categoryExist = await CategoryModel.findOne({
                name: createCategoryDTO.name
            })

            if( categoryExist ) throw CustomError.badRequest('Category already exist')

            const categoryNew = new CategoryModel({
                ...createCategoryDTO,
                user: user
            })          
          
            await categoryNew.save()            
          
            return {
                id: categoryNew.id
            }
            
        } 
        catch (error) 
        {
            throw CustomError.serverError(`${error}`)   
        }

    }

}