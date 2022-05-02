import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { Service } from "typedi";
import { AreaService } from '../area/area.service';
import { BrigadeService } from '../brigade/brigade.service';
import { HttpException } from '../exceptions/HttpException';
import { ProductService } from '../product/product.service';
import { AreaBrigadeProductService } from './area-brigade-product.service';
import { CreateAreaBrigadeProductDto } from './dto/create-area-brigade-product.dto';
import { DeleteAreaBrigadeProductDto } from './dto/delete-area-brigade-product.dto';
import { GetAllAreaBrigadeProductQueryDto } from './dto/get-all-area-brigade-products.dto';
import { UpdateAreaBrigadeProductDto } from './dto/update-area-brigade-product.dto';

const MAX_AREA_BRIGADE_PRODUCT_LIMIT = '100';

@Service()
export class AreaBrigadeProductController {
    constructor(private areaBrigadeProductService: AreaBrigadeProductService,
                private productService: ProductService,
                private areaService: AreaService,
                private brigadeService: BrigadeService){}
    async getAll(req: Request, res: Response){
        try {
            const quantityDto: GetAllAreaBrigadeProductQueryDto = req.query;
            if(!quantityDto.limit || isNaN(Number(quantityDto.limit)) || Number(quantityDto.limit) > Number(MAX_AREA_BRIGADE_PRODUCT_LIMIT))
                quantityDto.limit = MAX_AREA_BRIGADE_PRODUCT_LIMIT;
            const areaBrigadeProducts = await this.areaBrigadeProductService.getAllAreaBrigadeProducts(quantityDto.limit, quantityDto.findBy, quantityDto.findValue);
            return res.json(areaBrigadeProducts);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting all the area brigade products.'});
        }
    }

    async create(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: CreateAreaBrigadeProductDto = req.body;
            const checkDto = await this.areaBrigadeProductService.findByDto(dto);
            if(checkDto)
                throw new HttpException(400, 'This raw is already exists');
            const checkProductIdUnique = await this.areaBrigadeProductService.findByProductId(dto.ProductId);
            if(checkProductIdUnique)
                throw new HttpException(400, 'This Product id is already in use.');
            const checkProductExists = await this.productService.findById(dto.ProductId);
            if(!checkProductExists)
                throw new HttpException(400, "This Product id does not exist");
            const checkAreaExists = await this.areaService.findById(dto.AreaId);
            if(!checkAreaExists)
                throw new HttpException(400, "This Area id does not exist");
            const checkBrigadeExists = await this.brigadeService.findById(dto.BrigadeId);
            if(!checkBrigadeExists)
                throw new HttpException(400, "This Brigade id does not exist");
            await this.areaBrigadeProductService.create(dto);
            return res.json({message: 'The area brigade product was added.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error creating the area brigade product.'});
        }
    }

    async update(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: UpdateAreaBrigadeProductDto = req.body;
            const areaBrigadeProduct = await this.areaBrigadeProductService.findByDto({AreaId: dto.BeforeAreaId, BrigadeId: dto.BeforeBrigadeId, ProductId: dto.BeforeProductId});
            if(!areaBrigadeProduct)
                throw new HttpException(400, 'This raw does not exist');
            if(dto.ProductId !== areaBrigadeProduct.ProductId){
                const checkProductIdUnique = await this.areaBrigadeProductService.findByProductId(dto.ProductId);
                if(checkProductIdUnique)
                    throw new HttpException(400, 'This Product id is already in use.');
                const checkProductExists = await this.productService.findById(dto.ProductId);
                if(!checkProductExists)
                    throw new HttpException(400, "This Product id does not exist");
            }
            if(dto.AreaId !== areaBrigadeProduct.AreaId){
                const checkAreaExists = await this.areaService.findById(dto.AreaId);
                if(!checkAreaExists)
                    throw new HttpException(400, "This Area id does not exist");
            }
            if(dto.BrigadeId !== areaBrigadeProduct.BrigadeId){
                const checkBrigadeExists = await this.brigadeService.findById(dto.BrigadeId);
                if(!checkBrigadeExists)
                    throw new HttpException(400, "This Brigade id does not exist");
            }
            await this.areaBrigadeProductService.update(areaBrigadeProduct, dto);
            return res.json({message: 'The area brigade product was updated.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error updating the area brigade product.'});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: DeleteAreaBrigadeProductDto = req.body;
            const areaBrigadeProduct = await this.areaBrigadeProductService.findByDto(dto);
            if(!areaBrigadeProduct)
                throw new HttpException(400, 'This raw does not exist');
            await this.areaBrigadeProductService.delete(areaBrigadeProduct);
            return res.json({message: 'The area brigade product was deleted.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error deleting the area brigade product.'});
        }
    }
}