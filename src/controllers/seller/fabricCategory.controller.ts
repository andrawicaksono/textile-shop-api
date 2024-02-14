import { Request, Response, NextFunction } from 'express';
import { FabricCategoryService } from '../../services/fabricCategory.service';
import { FabricCategoryCreateDTO, FabricCategoryUpdateDTO } from '../../dto/fabricCategory.dto';
import { ApplicationError } from '../../utils/error';

export class FabricCategoryController {
  private fabricCategoryService: FabricCategoryService;

  constructor(fabricCategoryService: FabricCategoryService) {
    this.fabricCategoryService = fabricCategoryService;
  }

  createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryData: FabricCategoryCreateDTO = req.body;
      const [category, error] = await this.fabricCategoryService.createCategory(categoryData);

      if (error) {
        throw error;
      }

      res.status(201).json({
        statusCode: 201,
        message: "Create category success",
        data: category
      });
    } catch (error: any) {
      next(error);
    }
  }

  getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = parseInt(req.params.id);
      const [category, error] = await this.fabricCategoryService.getCategoryById(id);

      if (error) {
        throw error;
      }

      if (!category) {
        throw new ApplicationError('Fabric category not found', 404);
      }

      res.status(200).json({
        statusCode: 200,
        message: "Get category success",
        data: category
      });
    } catch (error: any) {
      next(error);
    }
  }

  updateCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = parseInt(req.params.id);
      const categoryData: FabricCategoryUpdateDTO = req.body;

      const [updatedCategory, error] = await this.fabricCategoryService.updateCategoryById(id, categoryData);
      
      if (error) {
        throw error;
      }
      
      if (!updatedCategory) {
        throw new ApplicationError('Fabric category not found', 404);
      }

      res.status(200).json({
        statusCode: 201,
        message: "Update category success",
      });
    } catch (error: any) {
      next(error);
    }
  }

  deleteCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = parseInt(req.params.id);

      const [deleted, error] = await this.fabricCategoryService.deleteCategoryById(id);

      if (error) {
        throw error;
      }

      if (!deleted) {
        throw new ApplicationError('Fabric category not found', 404);
      }

      res.status(200).json({
        statusCode: 200,
        message: "Delete category success"
      });
    } catch (error: any) {
      next(error);
    }
  }

  getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [categories, error] = await this.fabricCategoryService.getAllCategories();
      
      if (error) {
        throw error;
      }
      
      res.status(200).json({
        statusCode: 200,
        message: "Get all categories success",
        data: categories
      });
    } catch (error: any) {
      next(error);
    }
  }
}
