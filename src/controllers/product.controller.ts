import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import { ProductCreateDTO, ProductUpdateDTO } from '../dto/product.dto';
import { ApplicationError } from '../utils/error';

export class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData: ProductCreateDTO = req.body;
      const [product, error] = await this.productService.createProduct(productData);

      if (error) {
        throw error;
      }

      res.status(201).json({
        statusCode: 201,
        message: "Create product success",
        data: product
      });
    } catch (error: any) {
      next(error);
    }
  }

  getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = parseInt(req.params.id);
      const [product, error] = await this.productService.getProductById(id);

      if (error) {
        throw error;
      }

      if (!product) {
        throw new ApplicationError('Product not found', 404);
      }

      res.status(200).json({
        statusCode: 200,
        message: "Get product success",
        data: product
      });
    } catch (error: any) {
      next(error);
    }
  }

  updateProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = parseInt(req.params.id);
      const productData: ProductUpdateDTO = req.body;

      const [_, error] = await this.productService.updateProductById(id, productData);
      
      if (error) {
        throw error;
      }

      res.status(200).json({
        statusCode: 201,
        message: "Update product success",
      });
    } catch (error: any) {
      next(error);
    }
  }

  deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = parseInt(req.params.id);

      const [deleted, error] = await this.productService.deleteProductById(id);

      if (error) {
        throw error;
      }

      if (!deleted) {
        throw new ApplicationError('Product not found', 404);
      }

      res.status(200).json({
        statusCode: 200,
        message: "Delete product success"
      });
    } catch (error: any) {
      next(error);
    }
  }

  getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [products, error] = await this.productService.getAllProducts();
      
      if (error) {
        throw error;
      }
      
      res.status(200).json({
        statusCode: 200,
        message: "Get all products success",
        data: products
      });
    } catch (error: any) {
      next(error);
    }
  }
}
