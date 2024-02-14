import { Router } from 'express';
import { OrderRepository } from '../repositories/order.repository';
import { OrderService } from '../services/order.service';
import { OrderController } from '../controllers/order.controller';
import { validateInput } from '../middlewares/validationInput.middleware';
import { body } from 'express-validator';
import { authenticateJWT, checkRole } from '../middlewares/auth.middleware';
import { UserRole } from '../models/user.model';
import { OrderProductRepository } from '../repositories/orderProduct.repository';
import { OrderProductService } from '../services/orderProduct.service';
import { ProductRepository } from '../repositories/product.repository';
import { ProductService } from '../services/product.service';

const orderRouter = Router();

const orderRepository = new OrderRepository();

const orderProductRepository = new OrderProductRepository();
const orderProductService = new OrderProductService(orderProductRepository);

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

const orderService = new OrderService(orderRepository, orderProductService, productService);
const orderController = new OrderController(orderService);

orderRouter.post('/',
  authenticateJWT,
  checkRole(UserRole.BUYER),
  [
    body('address').notEmpty().withMessage("Address is required"),
    body('products').notEmpty().withMessage("Products is required"),
  ],
  validateInput,
  orderController.createOrder
);

orderRouter.get('/',
  orderController.getAllOrders
);

orderRouter.get('/:id',
  orderController.getOrderById
);

export default orderRouter;
