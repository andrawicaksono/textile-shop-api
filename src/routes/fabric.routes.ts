import { Router } from 'express';
import { FabricRepository } from '../repositories/fabric.repository';
import { FabricService } from '../services/fabric.service';
import { FabricController } from '../controllers/fabric.controller';
import { validateInput } from '../middlewares/validationInput.middleware';
import { body } from 'express-validator';
import { authenticateJWT, checkRole } from '../middlewares/auth.middleware';
import { UserRole } from '../models/user.model';

const fabricRouter = Router();

const fabricRepository = new FabricRepository();
const fabricService = new FabricService(fabricRepository);
const fabricController = new FabricController(fabricService);

fabricRouter.post('/',
  authenticateJWT,
  checkRole(UserRole.SELLER),
  [
    body('name').notEmpty().withMessage("Name is required"),
    body('categoryId').notEmpty().withMessage("Category ID is required")
  ],
  validateInput,
  fabricController.createFabric
);

fabricRouter.get('/',
  fabricController.getAllFabrics
);

fabricRouter.put('/:id',
  authenticateJWT,
  checkRole(UserRole.SELLER),
  fabricController.updateFabricById
);

fabricRouter.delete('/:id',
  authenticateJWT,
  checkRole(UserRole.SELLER),
  fabricController.deleteFabricById
);

fabricRouter.get('/:id',
  fabricController.getFabricById
);

export default fabricRouter;
