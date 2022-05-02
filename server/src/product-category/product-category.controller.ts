import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { Service } from "typedi";
import { HttpException } from '../exceptions/HttpException';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { DeleteProductCategoryDto } from './dto/delete-product-category.dto';
import { GetAllProductCategoriesQueryDto } from './dto/get-all-product-categories.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategoryService } from './product-category.service';

const MAX_PRODUCT_CATEGORY_LIMIT = '100';

@Service()
export class ProductCategoryController {
    constructor(private productCategoryService: ProductCategoryService){}
    async getAll(req: Request, res: Response){
        try {
            const quantityDto: GetAllProductCategoriesQueryDto = req.query;
            if(!quantityDto.limit || isNaN(Number(quantityDto.limit)) || Number(quantityDto.limit) > Number(MAX_PRODUCT_CATEGORY_LIMIT))
                quantityDto.limit = MAX_PRODUCT_CATEGORY_LIMIT;
            const productCategories = await this.productCategoryService.getAllProductCategories(quantityDto.limit, quantityDto.findBy, quantityDto.findValue);
            return res.json(productCategories);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting all the product categories.'});
        }
    }

    async create(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: CreateProductCategoryDto = req.body;
            const checkId = await this.productCategoryService.findById(dto.id);
            if(checkId)
                throw new HttpException(400, 'This id is already in use.');
            await this.productCategoryService.create(dto);
            return res.json({message: 'The product category was added.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error creating the product category.'});
        }
    }

    async update(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: UpdateProductCategoryDto = req.body;
            const productCategory = await this.productCategoryService.findById(dto.id);
            if(!productCategory)
                throw new HttpException(400, 'This product category does not exist.');
            await this.productCategoryService.update(productCategory, dto);
            return res.json({message: 'The product category was updated.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error updating the product category.'});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: DeleteProductCategoryDto = req.body;
            const productCategory = await this.productCategoryService.findById(dto.id);
            if(!productCategory)
                throw new HttpException(400, 'This product category does not exist.');
            await this.productCategoryService.delete(productCategory);
            return res.json({message: 'The product category was deleted.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error deleting the product category.'});
        }
    }
}