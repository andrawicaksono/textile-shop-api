import { FabricCategoryRepository } from '../repositories/fabricCategory.repository';
import { FabricCategoryDTO, FabricCategoryCreateDTO, FabricCategoryUpdateDTO } from '../dto/fabricCategory.dto';
import { ApplicationError } from '../utils/error';

export class FabricCategoryService {
  private fabricCategoryRepository: FabricCategoryRepository;

  constructor(fabricCategoryRepository: FabricCategoryRepository) {
    this.fabricCategoryRepository = fabricCategoryRepository;
  }

  createCategory = async (categoryData: FabricCategoryCreateDTO): Promise<[FabricCategoryDTO | null, Error | null]> => {
    try {
      const [category, error] = await this.fabricCategoryRepository.createCategory(categoryData);
      
      if (error) {
        throw error;
      }

      return [category, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  getCategoryById = async (id: number): Promise<[FabricCategoryDTO | null, Error | null]> => {
    try {
      const [category, error] = await this.fabricCategoryRepository.findCategoryById(id);
      
      if (error) {
        throw error;
      }

      if (!category) {
        throw new ApplicationError('Category not found', 404);
      }
      
      return [category, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  updateCategoryById = async (id: number, categoryData: FabricCategoryUpdateDTO): Promise<[FabricCategoryDTO | null, Error | null]> => {
    try {
      const [existingCategory, error] = await this.fabricCategoryRepository.findCategoryById(id);
      
      if (error) {
        throw error;
      }
      
      if (!existingCategory) {
        throw new ApplicationError('Category not found', 404);
      }

      const updatedCategory = { ...existingCategory, ...categoryData };
      
      const [updated, updateError] = await this.fabricCategoryRepository.updateCategoryById(id, updatedCategory);
      
      if (updateError) {
        throw updateError;
      }
      
      return [updated, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  deleteCategoryById = async (id: number): Promise<[boolean, Error | null]> => {
    try {
      const [deleted, error] = await this.fabricCategoryRepository.deleteCategoryById(id);
      
      if (error) {
        throw error;
      }
      
      if (!deleted) {
        throw new ApplicationError('Fabric category not found', 404);
      }

      return [true, null];
    } catch (error: any) {
      return [false, error];
    }
  }

  getAllCategories = async (): Promise<[FabricCategoryDTO[] | null, Error | null]> => {
    try {
      const [categories, error] = await this.fabricCategoryRepository.findAllCategories();
      
      if (error) {
        throw error;
      }

      return [categories, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}
