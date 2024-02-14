import { OrderProduct } from '../models/orderProduct.model';
import { OrderProductCreateDTO, OrderProductDTO } from '../dto/orderProduct.dto';

export class OrderProductRepository {
  createOrderProduct = async (orderProductData: OrderProductCreateDTO, orderId: string, amount: number): Promise<[OrderProductDTO | null, Error | null]> => {
    try {
      const orderProduct = await OrderProduct.create({
        productId: orderProductData.productId,
        quantity: orderProductData.quantity,
        orderId: orderId,
        amount: amount
      });

      return [orderProduct, null];
    } catch (error: any) {
      return [null, error];
    }
  }

}
