import { NextFunction, Request, Response } from "express";
import { JWTAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongo/models/user.model";
import { UserEntity } from "../../domain/entities/user.entity";

export class AuthMiddleware {

    static async validateJWT( req: Request , res: Response , next: NextFunction ){

        const authorization = req.header('Authorization')

        if( !authorization ) return res.status(401).json({ error: 'Not token provided' })

        if( !authorization.startsWith('Bearer ') ) return res.status(401).json({ error: 'INVALID TOKEN DECODED' })

        const token = authorization.split(' ')[1] || ''

        try 
        {
        
            const payload = await JWTAdapter.validateToken<{ id: string }>(token)

            if( payload === null ) return res.status(401).json({ error: 'INVALID TOKEN' })

            const user = await UserModel.findById(payload.id)

            if( !user ) return res.status(401).json({ error: 'INVALID USER' })

            req.body.user = UserEntity.fromObject(user)

            next()

        } 
        catch (error) 
        {
            console.log(error);
            return res.status(500).send('Error')
        }

    }
    
}