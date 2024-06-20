import { Router } from 'express';
import { AuthController } from './controller';




export class AuthRoutes {


  static get routes(): Router {

    const router = Router();
    
    const controller = new AuthController()

    // Definir las rutas
    router.post('/login', controller.login );
    router.post('/register', controller.register );
    // router.use('/validateemail/:token', /*TodoRoutes.routes */ );

    return router;
    
  }


}

