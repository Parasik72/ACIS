import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { Service } from "typedi";
import { CompanyService } from '../company/company.service';
import { HttpException } from '../exceptions/HttpException';
import { GetAllProductsQueryDto } from '../product/dto/get-all-products.dto';
import { ProductService } from '../product/product.service';
import { CreateProductMovementAccountingDto } from './dto/create-product-movement-accounting.dto';
import { DeleteProductMovementAccountingDto } from './dto/delete-product-movement-accounting.dto';
import { UpdateProductMovementAccountingDto } from './dto/update-product-movement-accounting.dto';
import { ProductMovementAccountingService } from './product-movement-accounting.service';

const MAX_PRODUCT_MOVEMENT_ACCOUNTING_LIMIT = '100';

@Service()
export class ProductMovementAccountingController {
    constructor(private productMovementAccountingService: ProductMovementAccountingService,
                private productService: ProductService,
                private companyService: CompanyService){}
    async getAll(req: Request, res: Response){
        try {
            const quantityDto: GetAllProductsQueryDto = req.query;
            if(!quantityDto.limit || isNaN(Number(quantityDto.limit)) || Number(quantityDto.limit) > Number(MAX_PRODUCT_MOVEMENT_ACCOUNTING_LIMIT))
                quantityDto.limit = MAX_PRODUCT_MOVEMENT_ACCOUNTING_LIMIT;
            const productsMovementAccounting = await this.productMovementAccountingService.getAllProductsMovementAccounting(quantityDto.limit, quantityDto.findBy, quantityDto.findValue);
            return res.json(productsMovementAccounting);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting all the products movement accounting.'});
        }
    }

    async create(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: CreateProductMovementAccountingDto = req.body;
            const checkProductUnique = await this.productMovementAccountingService.findbyProductId(dto.ProductId);
            if(checkProductUnique)
                throw new HttpException(400, 'This product id is already in use.');
            const checkProductId = await this.productService.findById(dto.ProductId);
            if(!checkProductId)
                throw new HttpException(400, 'This product id does not exist.');
            const checkCompanyId = await this.companyService.findById(dto.CompanyId);
            if(!checkCompanyId)
                throw new HttpException(400, 'This company id does not exist.');
            await this.productMovementAccountingService.create(dto);
            return res.json({message: 'The product movement accounting was added.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error creating the product movement accounting.'});
        }
    }

    async update(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: UpdateProductMovementAccountingDto = req.body;
            const productMovementAccounting = await this.productMovementAccountingService.findById(dto.id);
            if(!productMovementAccounting)
                throw new HttpException(400, 'This product movement accounting id does not exist.');
            if(dto.ProductId !== productMovementAccounting.ProductId){
                const checkProductUnique = await this.productMovementAccountingService.findbyProductId(dto.ProductId);
                if(checkProductUnique)
                    throw new HttpException(400, 'This product id is already in use.');
            }
            const checkProductId = await this.productService.findById(dto.ProductId);
            if(!checkProductId)
                throw new HttpException(400, 'This product id does not exist.');
            const checkCompanyId = await this.companyService.findById(dto.CompanyId);
            if(!checkCompanyId)
                throw new HttpException(400, 'This company id does not exist.');
            await this.productMovementAccountingService.update(productMovementAccounting, dto);
            return res.json({message: 'The product movement accounting was updated.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error updating the product movement accounting.'});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: DeleteProductMovementAccountingDto = req.body;
            const productMovementAccounting = await this.productMovementAccountingService.findById(dto.id);
            if(!productMovementAccounting)
                throw new HttpException(400, 'This product movement accounting id does not exist.');
            await this.productMovementAccountingService.delete(productMovementAccounting);
            return res.json({message: 'The product movement accounting was deleted.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error deleting the product movement accounting.'});
        }
    }
}