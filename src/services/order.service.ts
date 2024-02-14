import { OrderRepository } from '../repositories/order.repository';
import { OrderDTO, OrderCreateDTO } from '../dto/order.dto';
import { ApplicationError } from '../utils/error';
import { OrderProductService } from './orderProduct.service';
import { ProductService } from './product.service';
import { OrderProductCreateDTO } from '../dto/orderProduct.dto';
import { db } from '../db';

export class OrderService {
  private orderRepository: OrderRepository;
  private orderProductService: OrderProductService;
  private productService: ProductService

  constructor(
    orderRepository: OrderRepository,
    orderProductService: OrderProductService,
    productService: ProductService
  ) {
    this.orderRepository = orderRepository;
    this.orderProductService = orderProductService
    this.productService = productService
  }

  createOrder = async (orderData: OrderCreateDTO, productsData: OrderProductCreateDTO[]): Promise<[OrderDTO | null, Error | null]> => {
    let transaction;
    try {
      if (!db.sequelize) {
        throw new ApplicationError("Database not connected", 500)
      }

      transaction = await db.sequelize.transaction();
      const [order, error] = await this.orderRepository.createOrder(orderData);
      if (error) {
        throw error;
      }

      if (!order?.id) {
        throw new ApplicationError("Create order failed", 500);
      }

      let totalAmount = 0;

      for (const productData of productsData) {
        const [product, errorProduct] = await this.productService.getProductById(productData.productId);
        if (errorProduct) {
          throw errorProduct;
        }

        if (!product) {
          throw new ApplicationError('Product not found', 404);
        }

        let amount = (product.price || 0) * productData.quantity;
        this.orderProductService.createOrderProduct(productData, order?.id, amount);

        if (!product.stock) {
          throw new ApplicationError('Out of stock', 404);
        }

        product.stock = product.stock - productData.quantity;
        const [_, errorUpdateProduct] = await this.productService.updateProductById(product.id || 0, {stock: product.stock});
        if (errorUpdateProduct) {
          throw errorUpdateProduct;
        }
        totalAmount += amount;
      }

      const [_, errorUpdateUser] = await this.orderRepository.updateOrderById(order.id || "", {totalAmount: totalAmount});

      if (errorUpdateUser) {
        throw errorUpdateUser;
      }

      
      const [newOrder, errorNewOrder] = await this.orderRepository.findOrderById(order.id || "");
      if (errorNewOrder) {
        throw errorNewOrder;
      }
      await transaction.commit()
      
      return [newOrder, null];
    } catch (error: any) {
      if(transaction) {
        await transaction.rollback();
      }
      return [null, error];
    }
  }

  getOrderById = async (id: string): Promise<[OrderDTO | null, Error | null]> => {
    try {
      const [order, error] = await this.orderRepository.findOrderById(id);
      
      if (error) {
        throw error;
      }

      if (!order) {
        throw new ApplicationError('Order not found', 404);
      }
      
      return [order, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  getAllOrders = async (): Promise<[OrderDTO[] | null, Error | null]> => {
    try {
      const [orders, error] = await this.orderRepository.findAllOrders();
      
      if (error) {
        throw error;
      }

      return [orders, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}
