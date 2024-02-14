export interface OrderDTO {
  id?: string;
  userId?: string;
  address?: string;
  totalAmount?: number;
}

export interface OrderCreateDTO {
  userId: string;
  address: string;
}

export interface OrderUpdateDTO {
  totalAmount?: number
}