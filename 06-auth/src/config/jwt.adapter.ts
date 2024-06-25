import jwt from 'jsonwebtoken'
import { envs } from './envs'

export class JWTAdapter {

    static async generateToken( payload : any , duration:string = '2h' ) {

        return new Promise( ( resolve , rej ) => {
            
            jwt.sign( payload , envs.JWT_SEED , {
                expiresIn: duration
            } , 
            (err , token) => {
                if( err ) resolve(null)
                
                resolve(token)

            })
            

        })

    }

    static validateToken( token:string ){



    }

}