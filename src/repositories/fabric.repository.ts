import { Fabric } from '../models/fabric.model';
import { FabricCreateDTO, FabricDTO, FabricUpdateDTO } from '../dto/fabric.dto';

export class FabricRepository {
  createFabric = async (fabricData: FabricCreateDTO): Promise<[FabricDTO | null, Error | null]> => {
    try {
      const fabric = await Fabric.create({
        name: fabricData.name,
        description: fabricData?.description,
        fabricCategoryId: fabricData.categoryId,
        material: fabricData?.material
      });

      return [fabric, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  findFabricById = async (id: number): Promise<[FabricDTO | null, Error | null]> => {
    try {
      const fabric = await Fabric.findByPk(id);

      return [fabric, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  updateFabricById = async (id: number, fabricData: FabricUpdateDTO): Promise<[FabricDTO | null, Error | null]> => {
    try {
      const updatedFabric = await Fabric.update(fabricData, {
        where: { id },
        returning: true
      });

      return [updatedFabric[1][0], null];
    } catch (error:any) {
      return [null, error];
    }
  }

  deleteFabricById = async (id: number): Promise<[boolean, Error | null]> => {
    try {
      const rowsDeleted = await Fabric.destroy({ where: { id } });

      return [rowsDeleted > 0, null];
    } catch (error: any) {
      return [false, error];
    }
  }

  findAllFabrics = async (): Promise<[FabricDTO[] | null, Error | null]> => {
    try {
      const fabrics = await Fabric.findAll();

      return [fabrics, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}
