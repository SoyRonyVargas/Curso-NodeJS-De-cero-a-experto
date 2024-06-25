import { bcryptAdapter } from "../../config/bcrypt";
import { JWTAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongo/models/user.model";
import { LoginUserDTO, RegisterUserDTO } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
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

            user.password = bcryptAdapter.hash(registerUser.password)
            // JWT

            // EMAIL DE CONFIRMACIÓN

            await user.save()

            const { password , ...restUser } = UserEntity.fromObject(user)

            return {
                user: restUser,
                token: 'ABC'
            }

        } 
        catch (error) 
        {
            throw CustomError.badRequest(`${error}`)
        }

    }
    
    async loginUser( loginUser: LoginUserDTO ){

        const existeUser = await UserModel.findOne({
            email: loginUser.email
        }) 

        if( !existeUser ) throw CustomError.badRequest('User not exist')
        
        try 
        {
            
            // validad la contraseña  
            const validPassword = bcryptAdapter.compare(loginUser.password , existeUser.password)

            if( !validPassword ) throw CustomError.badRequest('Password is not valid')
            
            const { password , ...restUser } = UserEntity.fromObject(existeUser)
            
            // JWT
            const token = await JWTAdapter.generateToken( { id: restUser.id })

            if( !token ) throw CustomError.serverError('Error JWT')
            
            // EMAIL DE CONFIRMACIÓN

            return {
                user: restUser,
                token
            }

        } 
        catch (error) 
        {
            throw CustomError.badRequest(`${error}`)
        }

    }

}