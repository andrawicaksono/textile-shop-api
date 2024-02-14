import { Router } from 'express';
import { FabricCategoryRepository } from '../../repositories/fabricCategory.repository';
import { FabricCategoryService } from '../../services/fabricCategory.service';
import { FabricCategoryController } from '../../controllers/seller/fabricCategory.controller';
import { validateInput } from '../../middlewares/validationInput.middleware';
import { body } from 'express-validator';

const fabricCategoryRouter = Router();

const fabricCategoryRepository = new FabricCategoryRepository();
const fabricCategoryService = new FabricCategoryService(fabricCategoryRepository);
const fabricCategoryController = new FabricCategoryController(fabricCategoryService);

fabricCategoryRouter.post('/',
  [
    body('name').notEmpty().withMessage("Name is required")
  ],
  validateInput,
  fabricCategoryController.createCategory
);

fabricCategoryRouter.get('/',
  fabricCategoryController.getAllCategories
);

fabricCategoryRouter.put('/:id',
  fabricCategoryController.updateCategoryById
);

fabricCategoryRouter.delete('/:id',
  fabricCategoryController.deleteCategoryById
);

fabricCategoryRouter.get('/:id',
  fabricCategoryController.getCategoryById
);

export default fabricCategoryRouter;
