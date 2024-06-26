import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ProductService } from '../services/product.service';
import { ProductsController } from './products.controller';
import { Router } from 'express';

export class ProductsRoutes {

  static get routes(): Router {

    const router = Router();

    const service = new ProductService()

    const controller = new ProductsController(service)

    // Definir las rutas
    
    router.use(AuthMiddleware.validateJWT)

    router.get(
      '/', 
      controller.getAllProducts 
    );
    
    router.post(
      '/', 
      controller.create 
    );

    return router;
    
  }


}

