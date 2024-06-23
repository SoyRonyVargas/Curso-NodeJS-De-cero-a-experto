import { UserModel } from "../../data/mongo/models/user.model";
import { RegisterUserDTO } from "../../domain/dtos/auth/register-user.dto";
import { CustomError } from "../../domain/errors/custom.error";

export class AuthService { 

    constructor(

    ){

    }

    async registerUser( registerUser: RegisterUserDTO ){

        const existeUser = await UserModel.findOne({
            email: registerUser.email
        }) 

        if( existeUser ) throw CustomError.badRequest('Email already exist')
        
        try 
        {
            
            const user = new UserModel(registerUser)

            // encriptar la contraseña
            
            // JWT

            // EMAIL DE CONFIRMACIÓN

            await user.save()

            return user

        } 
        catch (error) 
        {
            throw CustomError.badRequest(`${error}`)
        }

    }

}