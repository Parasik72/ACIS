import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { Service } from "typedi";
import { HttpException } from '../exceptions/HttpException';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { DeleteEquipmentDto } from './dto/delete-equipment.dto';
import { GetAllEquipmentQueryDto } from './dto/get-all-equipments.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { EquipmentService } from './equipment.service';

const MAX_EQUIPMENT_LIMIT = '100';

@Service()
export class EquipmentController {
    constructor(private testService: EquipmentService){}
    async getAll(req: Request, res: Response){
        try {
            const quantityDto: GetAllEquipmentQueryDto = req.query;
            if(!quantityDto.limit || isNaN(Number(quantityDto.limit)) || Number(quantityDto.limit) > Number(MAX_EQUIPMENT_LIMIT))
                quantityDto.limit = MAX_EQUIPMENT_LIMIT;
            const equipments = await this.testService.getAllEquipments(quantityDto.limit, quantityDto.findBy, quantityDto.findValue);
            return res.json(equipments);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting all the equipments.'});
        }
    }

    async create(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: CreateEquipmentDto = req.body;
            const checkId = await this.testService.findById(dto.id);
            if(checkId)
                throw new HttpException(400, 'This id is already in use.');
            await this.testService.create(dto);
            return res.json({message: 'The equipment was added.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error creating the equipment.'});
        }
    }

    async update(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: UpdateEquipmentDto = req.body;
            const equipment = await this.testService.findById(dto.id);
            if(!equipment)
                throw new HttpException(400, 'This equipment id does not exist.');
            await this.testService.update(equipment, dto);
            return res.json({message: 'The equipment was updated.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error updating the equipment.'});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: DeleteEquipmentDto = req.body;
            const equipment = await this.testService.findById(dto.id);
            if(!equipment)
                throw new HttpException(400, 'This equipment id does not exist.');
            await this.testService.delete(equipment);
            return res.json({message: 'The equipment was deleted.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error deleting the equipment.'});
        }
    }
}