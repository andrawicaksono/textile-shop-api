import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../services/order.service';
import { OrderCreateDTO } from '../dto/order.dto';
import { ApplicationError } from '../utils/error';
import { OrderProductCreateDTO } from '../dto/orderProduct.dto';

export class OrderController {
  private orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new ApplicationError("User unauthorized", 401)
      }

      const data = req.body;

      const orderData: OrderCreateDTO = {
        userId: userId,
        address: data.address
      }

      const productsData: OrderProductCreateDTO[] = data.products;

      const [order, error] = await this.orderService.createOrder(orderData, productsData);

      if (error) {
        throw error;
      }

      res.status(201).json({
        statusCode: 201,
        message: "Create order success",
        data: order
      });
    } catch (error: any) {
      next(error);
    }
  }

  getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const [order, error] = await this.orderService.getOrderById(id);

      if (error) {
        throw error;
      }

      if (!order) {
        throw new ApplicationError('Order not found', 404);
      }

      res.status(200).json({
        statusCode: 200,
        message: "Get order success",
        data: order
      });
    } catch (error: any) {
      next(error);
    }
  }

  getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [orders, error] = await this.orderService.getAllOrders();
      
      if (error) {
        throw error;
      }
      
      res.status(200).json({
        statusCode: 200,
        message: "Get all orders success",
        data: orders
      });
    } catch (error: any) {
      next(error);
    }
  }
}
