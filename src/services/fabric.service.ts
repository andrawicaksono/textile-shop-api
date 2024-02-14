import { FabricRepository } from '../repositories/fabric.repository';
import { FabricDTO, FabricCreateDTO, FabricUpdateDTO } from '../dto/fabric.dto';
import { ApplicationError } from '../utils/error';

export class FabricService {
  private fabricRepository: FabricRepository;

  constructor(fabricRepository: FabricRepository) {
    this.fabricRepository = fabricRepository;
  }

  createFabric = async (fabricData: FabricCreateDTO): Promise<[FabricDTO | null, Error | null]> => {
    try {
      const [fabric, error] = await this.fabricRepository.createFabric(fabricData);
      
      if (error) {
        throw error;
      }

      return [fabric, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  getFabricById = async (id: number): Promise<[FabricDTO | null, Error | null]> => {
    try {
      const [fabric, error] = await this.fabricRepository.findFabricById(id);
      
      if (error) {
        throw error;
      }

      if (!fabric) {
        throw new ApplicationError('Fabric not found', 404);
      }
      
      return [fabric, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  updateFabricById = async (id: number, fabricData: FabricDTO): Promise<[FabricDTO | null, Error | null]> => {
    try {
      const [existingFabric, error] = await this.fabricRepository.findFabricById(id);
      
      if (error) {
        throw error;
      }
      
      if (!existingFabric) {
        throw new ApplicationError('Fabric not found', 404);
      }

      const updatedFabric = { ...existingFabric, ...fabricData };
      
      const [updated, updateError] = await this.fabricRepository.updateFabricById(id, updatedFabric);
      
      if (updateError) {
        throw updateError;
      }
      
      return [{
        id: updated?.id,
        name: updated?.name,
        description: updated?.description,
        material: updated?.material
      }, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  deleteFabricById = async (id: number): Promise<[boolean, Error | null]> => {
    try {
      const [deleted, error] = await this.fabricRepository.deleteFabricById(id);
      
      if (error) {
        throw error;
      }
      
      if (!deleted) {
        throw new ApplicationError('Fabric not found', 404);
      }

      return [true, null];
    } catch (error: any) {
      return [false, error];
    }
  }

  getAllFabrics = async (): Promise<[FabricDTO[] | null, Error | null]> => {
    try {
      const [fabrics, error] = await this.fabricRepository.findAllFabrics();
      
      if (error) {
        throw error;
      }

      return [fabrics, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}
