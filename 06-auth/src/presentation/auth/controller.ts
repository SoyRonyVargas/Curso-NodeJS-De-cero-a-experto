import { Request, Response } from "express"


export class AuthController {

    constructor(){}

    register = ( req : Request , res : Response ) => {

        return res.json({ msg: 'Register' })

    }
    
    login = ( req : Request , res : Response ) => {

        return res.json({ msg: 'Login' })

    }

}