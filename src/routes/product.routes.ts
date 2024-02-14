import { Router } from 'express';
import { ProductRepository } from '../repositories/product.repository';
import { ProductService } from '../services/product.service';
import { ProductController } from '../controllers/product.controller';
import { validateInput } from '../middlewares/validationInput.middleware';
import { body } from 'express-validator';
import { authenticateJWT, checkRole } from '../middlewares/auth.middleware';
import { UserRole } from '../models/user.model';

const productRouter = Router();

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

productRouter.post('/',
  authenticateJWT,
  checkRole(UserRole.SELLER),
  [
    body('name').notEmpty().withMessage("Name is required"),
    body('price').notEmpty().withMessage("Price is required"),
    body('stock').notEmpty().withMessage("Stock is required"),
    body('fabricId').notEmpty().withMessage("Fabric ID is required"),
  ],
  validateInput,
  productController.createProduct
);

productRouter.get('/',
  productController.getAllProducts
);

productRouter.put('/:id',
  authenticateJWT,
  checkRole(UserRole.SELLER),
  productController.updateProductById
);

productRouter.delete('/:id',
  authenticateJWT,
  checkRole(UserRole.SELLER),
  productController.deleteProductById
);

productRouter.get('/:id',
  productController.getProductById
);

export default productRouter;
