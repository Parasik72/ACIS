import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { Service } from "typedi";
import { HttpException } from '../exceptions/HttpException';
import { ProductCategoryService } from '../product-category/product-category.service';
import { CreateProductDto } from './dto/create-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { GetAllProductsQueryDto } from './dto/get-all-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

const MAX_PRODUCT_LIMIT = '100';

@Service()
export class ProductController {
    constructor(private productService: ProductService,
                private productCategoryService: ProductCategoryService){}
    async getAll(req: Request, res: Response){
        try {
            const quantityDto: GetAllProductsQueryDto = req.query;
            if(!quantityDto.limit || isNaN(Number(quantityDto.limit)) || Number(quantityDto.limit) > Number(MAX_PRODUCT_LIMIT))
                quantityDto.limit = MAX_PRODUCT_LIMIT;
            const products = await this.productService.getAllProducts(quantityDto.limit, quantityDto.findBy, quantityDto.findValue);
            return res.json(products);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting all the products.'});
        }
    }

    async create(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: CreateProductDto = req.body;
            const checkId = await this.productService.findById(dto.id);
            if(checkId)
                throw new HttpException(400, 'This id is already in use.');
            const checkCategoryId = await this.productCategoryService.findById(dto.CategoryId);
            if(!checkCategoryId)
                throw new HttpException(400, 'This product category id does not exist.');
            await this.productService.create(dto);
            return res.json({message: 'The product was added.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error creating the product.'});
        }
    }

    async update(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: UpdateProductDto = req.body;
            const product = await this.productService.findById(dto.id);
            if(!product)
                throw new HttpException(400, 'This product id does not exist.');
            const checkCategoryId = await this.productCategoryService.findById(dto.CategoryId);
            if(!checkCategoryId)
                throw new HttpException(400, 'This product category id does not exist.');
            await this.productService.update(product, dto);
            return res.json({message: 'The product was updated.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error updating the product.'});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: DeleteProductDto = req.body;
            const product = await this.productService.findById(dto.id);
            if(!product)
                throw new HttpException(400, 'This product id does not exist.');
            await this.productService.delete(product);
            return res.json({message: 'The product was deleted.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error deleting the product.'});
        }
    }
}