import { ProductRepository } from '../repositories/product.repository';
import { ProductDTO, ProductCreateDTO, ProductUpdateDTO } from '../dto/product.dto';
import { ApplicationError } from '../utils/error';

export class ProductService {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  createProduct = async (productData: ProductCreateDTO): Promise<[ProductDTO | null, Error | null]> => {
    try {
      const [product, error] = await this.productRepository.createProduct(productData);
      
      if (error) {
        throw error;
      }

      return [product, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  getProductById = async (id: number): Promise<[ProductDTO | null, Error | null]> => {
    try {
      const [product, error] = await this.productRepository.findProductById(id);
      
      if (error) {
        throw error;
      }

      if (!product) {
        throw new ApplicationError('Product not found', 404);
      }
      
      return [product, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  updateProductById = async (id: number, productData: ProductUpdateDTO): Promise<[boolean, Error | null]> => {
    try {
      const [existingProduct, error] = await this.productRepository.findProductById(id);
      
      if (error) {
        throw error;
      }
      
      if (!existingProduct) {
        throw new ApplicationError('Product not found', 404);
      }

      const updatedProduct = { ...existingProduct, ...productData };
      
      const [updated, updateError] = await this.productRepository.updateProductById(id, updatedProduct);
      
      if (updateError) {
        throw updateError;
      }
      
      return [updated, null];
    } catch (error: any) {
      return [false, error];
    }
  }

  deleteProductById = async (id: number): Promise<[boolean, Error | null]> => {
    try {
      const [deleted, error] = await this.productRepository.deleteProductById(id);
      
      if (error) {
        throw error;
      }
      
      if (!deleted) {
        throw new ApplicationError('Product not found', 404);
      }

      return [true, null];
    } catch (error: any) {
      return [false, error];
    }
  }

  getAllProducts = async (): Promise<[ProductDTO[] | null, Error | null]> => {
    try {
      const [products, error] = await this.productRepository.findAllProducts();
      
      if (error) {
        throw error;
      }

      return [products, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}
