import { Order } from '../models/order.model';
import { OrderCreateDTO, OrderDTO, OrderUpdateDTO } from '../dto/order.dto';
import { OrderProduct } from '../models/orderProduct.model';

export class OrderRepository {
  createOrder = async (orderData: OrderCreateDTO): Promise<[OrderDTO | null, Error | null]> => {
    try {
      const order = await Order.create({
        userId: orderData.userId,
        address: orderData.address,
      });

      return [order, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  updateOrderById = async (id: string, productData: OrderUpdateDTO): Promise<[boolean, Error | null]> => {
    try {
      const updatedOrder = await Order.update(productData, {
        where: { id },
      });

      return [updatedOrder[0] > 0, null];
    } catch (error:any) {
      return [false, error];
    }
  }

  findOrderById = async (id: string): Promise<[OrderDTO | null, Error | null]> => {
    try {
      const order = await Order.findByPk(id, {include: OrderProduct});

      return [order, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  findAllOrders = async (): Promise<[OrderDTO[] | null, Error | null]> => {
    try {
      const orders = await Order.findAll({include: OrderProduct});

      return [orders, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}
