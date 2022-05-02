import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { Service } from "typedi";
import { AttributeService } from '../attribute/attribute.service';
import { EmployeePositionService } from '../employee-position/employee-position.service';
import { HttpException } from '../exceptions/HttpException';
import { CreatePositionAttributeDto } from './dto/create-position-attribute.dto';
import { DeletePositionAttributeDto } from './dto/delete-position-attribute.dto';
import { GetAllPositionAttributesQueryDto } from './dto/get-all-persons-query.dto';
import { UpdatePositionAttributeDto } from './dto/update-position-attribute.dto';
import { PositionAttributeService } from './position-attribute.service';

const MAX_PERSON_LIMIT = '100';

@Service()
export class PositionAttributeController {
    constructor(private positionAttributeService: PositionAttributeService,
                private employeePositionService: EmployeePositionService,
                private attributeService: AttributeService){}
    async getAll(req: Request, res: Response){
        try {
            const quantityDto: GetAllPositionAttributesQueryDto = req.query;
            if(!quantityDto.limit || isNaN(Number(quantityDto.limit)) || Number(quantityDto.limit) > Number(MAX_PERSON_LIMIT))
                quantityDto.limit = MAX_PERSON_LIMIT;
            const persons = await this.positionAttributeService.getAllPositionAttributes(quantityDto.limit, quantityDto.findBy, quantityDto.findValue);
            return res.json(persons);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting all the position attributes.'});
        }
    }

    async create(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: CreatePositionAttributeDto = req.body;
            const checkUnique = await this.positionAttributeService.findByDto(dto);
            if(checkUnique)
                throw new HttpException(400, 'This row is already in use.');
            const checkPositionId = await this.employeePositionService.findById(dto.PositionId);
            if(!checkPositionId)
                throw new HttpException(400, 'This position id does not exist.');
            const checkAttributeId = await this.attributeService.findById(dto.AttributeId);
            if(!checkAttributeId)
                throw new HttpException(400, 'This attribute id does not exist.');
            await this.positionAttributeService.create(dto);
            return res.json({message: 'The position attribute was added.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error creating the position attribute.'});
        }
    }

    async update(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: UpdatePositionAttributeDto = req.body;
            const positionAttribute = await this.positionAttributeService.findByDto({AttributeId: dto.BeforeAttributeId, PositionId: dto.BeforePositionId});
            if(!positionAttribute)
                throw new HttpException(400, 'This row does not exist');
            if(dto.AttributeId !== positionAttribute.AttributeId || dto.PositionId !== positionAttribute.PositionId){
                const checkUnique = await this.positionAttributeService.findByDto({AttributeId: dto.AttributeId, PositionId: dto.PositionId});
                if(checkUnique)
                    throw new HttpException(400, 'This row is already in use.');
            }
            const checkPositionId = await this.employeePositionService.findById(dto.PositionId);
            if(!checkPositionId)
                throw new HttpException(400, 'This position id does not exist.');
            const checkAttributeId = await this.attributeService.findById(dto.AttributeId);
            if(!checkAttributeId)
                throw new HttpException(400, 'This attribute id does not exist.');
            await this.positionAttributeService.update(positionAttribute, dto);
            return res.json({message: 'The position attribute was updated.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error updating the position attribute.'});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: DeletePositionAttributeDto = req.body;
            const positionAttribute = await this.positionAttributeService.findByDto(dto);
            if(!positionAttribute)
                throw new HttpException(400, 'This row does not exist');
            await this.positionAttributeService.delete(positionAttribute);
            return res.json({message: 'The position attribute was deleted.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error deleting the position attribute.'});
        }
    }
}