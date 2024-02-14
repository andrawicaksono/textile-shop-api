export interface OrderProductDTO {
  id?: string;
  orderId?: string;
  productId?: number;
  quantity?: number;
  amount?: number
}

export interface OrderProductCreateDTO {
  productId: number;
  quantity: number;
}