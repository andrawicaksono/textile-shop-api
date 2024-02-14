export interface ProductDTO {
  id?: number;
  name?: string;
  description?: string;
  thickness?: string;
  colour?: string,
  price?: number,
  stock?: number,
  fabricId?: number;
}

export interface ProductCreateDTO {
  name: string;
  description?: string;
  thickness?: string;
  colour?: string,
  price: number,
  stock: number,
  fabricId: number;
}

export interface ProductUpdateDTO {
  name?: string;
  description?: string;
  thickness?: string;
  colour?: string,
  price?: number,
  stock?: number,
  fabricId?: number;
}