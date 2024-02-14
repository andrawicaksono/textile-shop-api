import { Product } from '../models/product.model';
import { ProductCreateDTO, ProductDTO, ProductUpdateDTO } from '../dto/product.dto';

export class ProductRepository {
  createProduct = async (productData: ProductCreateDTO): Promise<[ProductDTO | null, Error | null]> => {
    try {
      const product = await Product.create({
        name: productData.name,
        description: productData?.description,
        thickness: productData?.thickness,
        colour: productData?.colour,
        price: productData.price,
        stock: productData.stock,
        fabricId: productData.fabricId
      });

      return [product, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  findProductById = async (id: number): Promise<[ProductDTO | null, Error | null]> => {
    try {
      const product = await Product.findByPk(id);

      return [product, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  updateProductById = async (id: number, productData: ProductUpdateDTO): Promise<[ProductDTO | null, Error | null]> => {
    try {
      const updatedProduct = await Product.update(productData, {
        where: { id },
        returning: true
      });

      return [updatedProduct[1][0], null];
    } catch (error:any) {
      return [null, error];
    }
  }

  deleteProductById = async (id: number): Promise<[boolean, Error | null]> => {
    try {
      const rowsDeleted = await Product.destroy({ where: { id } });

      return [rowsDeleted > 0, null];
    } catch (error: any) {
      return [false, error];
    }
  }

  findAllProducts = async (): Promise<[ProductDTO[] | null, Error | null]> => {
    try {
      const products = await Product.findAll();

      return [products, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}
