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

    static validateToken<T>( token:string ) : Promise<T | null> {

        return new Promise( (resolve) => {

            jwt.verify( token, envs.JWT_SEED, (err, decoded) => {
      
              if( err ) return resolve(null);
      
              resolve(decoded as T);
      
            });
      
        })
    }

}