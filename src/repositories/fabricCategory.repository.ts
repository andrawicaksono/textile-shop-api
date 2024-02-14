import { FabricCategory } from '../models/fabricCategory.model';
import { FabricCategoryCreateDTO, FabricCategoryDTO, FabricCategoryUpdateDTO } from '../dto/fabricCategory.dto';

export class FabricCategoryRepository {
  createCategory = async (categoryData: FabricCategoryCreateDTO): Promise<[FabricCategoryDTO | null, Error | null]> => {
    try {
      const category = await FabricCategory.create({
        name: categoryData.name,
        description: categoryData?.description
      });

      return [category, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  findCategoryById = async (id: number): Promise<[FabricCategoryDTO | null, Error | null]> => {
    try {
      const category = await FabricCategory.findByPk(id);

      return [category, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  updateCategoryById = async (id: number, categoryData: FabricCategoryUpdateDTO): Promise<[FabricCategoryDTO | null, Error | null]> => {
    try {
      const updatedCategory = await FabricCategory.update(categoryData, {
        where: { id },
        returning: true
      });

      return [updatedCategory[1][0], null];
    } catch (error:any) {
      return [null, error];
    }
  }

  deleteCategoryById = async (id: number): Promise<[boolean, Error | null]> => {
    try {
      const rowsDeleted = await FabricCategory.destroy({ where: { id } });

      return [rowsDeleted > 0, null];
    } catch (error: any) {
      return [false, error];
    }
  }

  findAllCategories = async (): Promise<[FabricCategoryDTO[] | null, Error | null]> => {
    try {
      const categories = await FabricCategory.findAll();

      return [categories, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}
