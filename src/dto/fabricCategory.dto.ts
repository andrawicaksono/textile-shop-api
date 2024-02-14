export interface FabricCategoryDTO {
  id?: number;
  name?: string;
  description?: string;
}

export interface FabricCategoryCreateDTO {
  name: string;
  description?: string;
}

export interface FabricCategoryUpdateDTO {
  name?: string;
  description?: string;
}