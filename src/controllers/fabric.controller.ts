import { Request, Response, NextFunction } from 'express';
import { FabricService } from '../services/fabric.service';
import { FabricCreateDTO, FabricUpdateDTO } from '../dto/fabric.dto';
import { ApplicationError } from '../utils/error';

export class FabricController {
  private fabricService: FabricService;

  constructor(fabricService: FabricService) {
    this.fabricService = fabricService;
  }

  createFabric = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fabricData: FabricCreateDTO = req.body;
      const [fabric, error] = await this.fabricService.createFabric(fabricData);

      if (error) {
        throw error;
      }

      res.status(201).json({
        statusCode: 201,
        message: "Create fabric success",
        data: fabric
      });
    } catch (error: any) {
      next(error);
    }
  }

  getFabricById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = parseInt(req.params.id);
      const [fabric, error] = await this.fabricService.getFabricById(id);

      if (error) {
        throw error;
      }

      if (!fabric) {
        throw new ApplicationError('Fabric not found', 404);
      }

      res.status(200).json({
        statusCode: 200,
        message: "Get fabric success",
        data: fabric
      });
    } catch (error: any) {
      next(error);
    }
  }

  updateFabricById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = parseInt(req.params.id);
      const fabricData: FabricUpdateDTO = req.body;

      const [updatedFabric, error] = await this.fabricService.updateFabricById(id, fabricData);
      
      if (error) {
        throw error;
      }
      
      if (!updatedFabric) {
        throw new ApplicationError('Fabric not found', 404);
      }

      res.status(200).json({
        statusCode: 201,
        message: "Update fabric success",
      });
    } catch (error: any) {
      next(error);
    }
  }

  deleteFabricById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = parseInt(req.params.id);

      const [deleted, error] = await this.fabricService.deleteFabricById(id);

      if (error) {
        throw error;
      }

      if (!deleted) {
        throw new ApplicationError('Fabric not found', 404);
      }

      res.status(200).json({
        statusCode: 200,
        message: "Delete fabric success"
      });
    } catch (error: any) {
      next(error);
    }
  }

  getAllFabrics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [fabrics, error] = await this.fabricService.getAllFabrics();
      
      if (error) {
        throw error;
      }
      
      res.status(200).json({
        statusCode: 200,
        message: "Get all fabrics success",
        data: fabrics
      });
    } catch (error: any) {
      next(error);
    }
  }
}
