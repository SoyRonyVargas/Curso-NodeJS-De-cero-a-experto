import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../services/auth.service';
import { EmailService } from '../services/email.service';
import { envs } from '../../config/envs';




export class AuthRoutes {


  static get routes(): Router {

    const router = Router();
    
    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY
    )

    const authService = new AuthService(emailService)

    const controller = new AuthController(
      authService
    )

    // Definir las rutas
    router.post('/login', controller.login );
    router.post('/register', controller.register );
    router.use('/validate/:token', controller.validateEmail );

    return router;
    
  }


}

