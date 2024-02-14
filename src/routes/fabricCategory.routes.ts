import { Router } from 'express';
import { FabricCategoryRepository } from '../repositories/fabricCategory.repository';
import { FabricCategoryService } from '../services/fabricCategory.service';
import { FabricCategoryController } from '../controllers/fabricCategory.controller';
import { validateInput } from '../middlewares/validationInput.middleware';
import { body } from 'express-validator';
import { authenticateJWT, checkRole } from '../middlewares/auth.middleware';
import { UserRole } from '../models/user.model';

const fabricCategoryRouter = Router();

const fabricCategoryRepository = new FabricCategoryRepository();
const fabricCategoryService = new FabricCategoryService(fabricCategoryRepository);
const fabricCategoryController = new FabricCategoryController(fabricCategoryService);

fabricCategoryRouter.post('/',
  authenticateJWT,
  checkRole(UserRole.SELLER),
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
  authenticateJWT,
  checkRole(UserRole.SELLER),
  fabricCategoryController.updateCategoryById
);

fabricCategoryRouter.delete('/:id',
  authenticateJWT,
  checkRole(UserRole.SELLER),
  fabricCategoryController.deleteCategoryById
);

fabricCategoryRouter.get('/:id',
  fabricCategoryController.getCategoryById
);

export default fabricCategoryRouter;
