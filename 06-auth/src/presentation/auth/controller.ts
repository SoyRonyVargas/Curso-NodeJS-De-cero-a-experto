import { Request, Response } from "express"
import { LoginUserDTO, RegisterUserDTO } from "../../domain/dtos/auth/register-user.dto"
import { AuthService } from "../services/auth.service"
import { CustomError } from "../../domain/errors/custom.error"


export class AuthController {

    constructor(
        public readonly authService: AuthService
    ){}

    register = async ( req : Request , res : Response ) => {

        try {
            
            const [ error , registerDTO ] = RegisterUserDTO.create(req.body)

            if( error ) return res.status(400).json(error)

            const result = await this.authService.registerUser(registerDTO!)

            return res.json({ msg: 'Register' , data: {registerDTO , result} })

        } 
        catch (error) 
        {
            this.handleError(error , res)
        }

    }
    
    login = async ( req : Request , res : Response ) => {

        try {
            
            const [ error , loginUserDTO ] = LoginUserDTO.create(req.body)

            if( error ) return res.status(400).json(error)

            const result = await this.authService.loginUser(loginUserDTO!)

            return res.json({ msg: 'Login' , data: result })

        } 
        catch (error) 
        {
            this.handleError(error , res)
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