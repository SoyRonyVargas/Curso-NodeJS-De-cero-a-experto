import { bcryptAdapter } from "../../config/bcrypt";
import { JWTAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongo/models/user.model";
import { LoginUserDTO, RegisterUserDTO } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom.error";
import { EmailService } from "./email.service";

export class AuthService { 

    constructor(
        private readonly emailService: EmailService
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

            const { password , ...restUser } = UserEntity.fromObject(user)

            // JWT
            const token = await JWTAdapter.generateToken({ id: restUser.id })

            // EMAIL DE CONFIRMACIÓN
            await this.sendEmailValidationLink(restUser.email)

            await user.save()

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

    private async sendEmailValidationLink( email: string ){

        const token = await JWTAdapter.generateToken({ email })

        if( !token ) throw CustomError.serverError('JWT Error')
        
        const link = `http://localhost:3000/api/auth/validate/${String(token)}`

        const html = `
            <h1>Validate your email</h1>
            <p>
                Click on the following link 
                <a href='${link}'>
                    Validate your email
                </a>
            </p>
        `

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html
        }

        const isSet = await this.emailService.sendEmail(options)

        if( !isSet ) throw CustomError.serverError('Email not send - Error');

        return true

    }

    public validateEmail = async ( token:string ) => {

        const payload = await JWTAdapter.validateToken(token);
        
        if ( !payload ) throw CustomError.unauthorized('Invalid token');
    
        const { email } = payload as { email: string };
        
        if ( !email ) throw CustomError.serverError('Email not in token');
    
        const user = await UserModel.findOne({ email });
        
        if ( !user ) throw CustomError.serverError('Email not exists');
    
        user.emailValidated = true;

        await user.save();
    
        return true;
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