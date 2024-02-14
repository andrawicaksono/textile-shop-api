import { OrderProductRepository } from '../repositories/orderProduct.repository';
import { OrderProductDTO, OrderProductCreateDTO } from '../dto/orderProduct.dto';

export class OrderProductService {
  private orderProductRepository: OrderProductRepository;

  constructor(orderProductRepository: OrderProductRepository) {
    this.orderProductRepository = orderProductRepository;
  }

  createOrderProduct = async (orderProductData: OrderProductCreateDTO, orderId: string, amount: number): Promise<[OrderProductDTO | null, Error | null]> => {
    try {
      const [order, error] = await this.orderProductRepository.createOrderProduct(orderProductData, orderId, amount);
      
      if (error) {
        throw error;
      }

      return [order, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}
