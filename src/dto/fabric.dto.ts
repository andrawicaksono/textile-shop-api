export interface FabricDTO {
  id?: number;
  name?: string;
  description?: string;
  material?: string;
  categoryId?: number;
}

export interface FabricCreateDTO {
  name: string;
  description?: string;
  material?: string;
  categoryId: number;
}

export interface FabricUpdateDTO {
  name?: string;
  description?: string;
  material?: string
  categoryId?: number;
}