import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { Service } from "typedi";
import { HttpException } from '../exceptions/HttpException';
import { ProductService } from '../product/product.service';
import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { DeleteAttributeDto } from './dto/delete-attribute.dto';
import { GetAllAttributesQueryDto } from './dto/get-all-attributes.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';

const MAX_ATTRIBUTE_LIMIT = '100';

@Service()
export class AttributeController {
    constructor(private attributeService: AttributeService,
                private productService: ProductService){}
    async getAll(req: Request, res: Response){
        try {
            const quantityDto: GetAllAttributesQueryDto = req.query;
            if(!quantityDto.limit || isNaN(Number(quantityDto.limit)) || Number(quantityDto.limit) > Number(MAX_ATTRIBUTE_LIMIT))
                quantityDto.limit = MAX_ATTRIBUTE_LIMIT;
            const attributes = await this.attributeService.getAllAttributes(quantityDto.limit, quantityDto.findBy, quantityDto.findValue);
            return res.json(attributes);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting all the attributes.'});
        }
    }

    async create(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: CreateAttributeDto = req.body;
            const checkId = await this.attributeService.findById(dto.id);
            if(checkId)
                throw new HttpException(400, 'This id is already in use.');
            const checkProductId = await this.productService.findById(dto.ProductId);
            if(!checkProductId)
                throw new HttpException(400, 'This product id does not exist.');
            await this.attributeService.create(dto);
            return res.json({message: 'The attribute was added.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error creating the attribute.'});
        }
    }

    async update(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: UpdateAttributeDto = req.body;
            const attribute = await this.attributeService.findById(dto.id);
            if(!attribute)
                throw new HttpException(400, 'This attribute id does not exist.');
            const checkProductId = await this.productService.findById(dto.ProductId);
            if(!checkProductId)
                throw new HttpException(400, 'This product id does not exist.');
            await this.attributeService.update(attribute, dto);
            return res.json({message: 'The attribute was updated.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error updating the attribute.'});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: DeleteAttributeDto = req.body;
            const attribute = await this.attributeService.findById(dto.id);
            if(!attribute)
                throw new HttpException(400, 'This attribute id does not exist.');
            await this.attributeService.delete(attribute);
            return res.json({message: 'The attribute was deleted.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error deleting the attribute.'});
        }
    }
}