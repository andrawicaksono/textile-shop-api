export interface ProductDTO {
  id?: number;
  name?: string;
  description?: string;
  thickness?: string;
  colour?: string,
  price?: number,
  stock?: number,
  fabricId?: number;
  photo?: string,
}

export interface ProductCreateDTO {
  name: string;
  description?: string;
  thickness?: string;
  colour?: string,
  price: number,
  stock: number,
  fabricId: number;
  photo?: string,
}

export interface ProductUpdateDTO {
  name?: string;
  description?: string;
  thickness?: string;
  colour?: string,
  price?: number,
  stock?: number,
  fabricId?: number;
  photo?: string,
}