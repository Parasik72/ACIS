import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { Service } from "typedi";
import { HttpException } from '../exceptions/HttpException';
import { ManufactoryService } from '../manufactory/manufactory.service';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { DeleteAreaDto } from './dto/delete-area.dto';
import { GetAllAreasQueryDto } from './dto/get-all-areas.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

const MAX_AREA_LIMIT = '100';

@Service()
export class AreaController {
    constructor(private areaService: AreaService,
                private manufactoryService: ManufactoryService){}
    async getAll(req: Request, res: Response){
        try {
            const quantityDto: GetAllAreasQueryDto = req.query;
            if(!quantityDto.limit || isNaN(Number(quantityDto.limit)) || Number(quantityDto.limit) > Number(MAX_AREA_LIMIT))
                quantityDto.limit = MAX_AREA_LIMIT;
            const areas = await this.areaService.getAllAreas(quantityDto.limit, quantityDto.findBy, quantityDto.findValue);
            return res.json(areas);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting all the areas.'});
        }
    }

    async create(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: CreateAreaDto = req.body;
            const checkId = await this.areaService.findById(dto.id);
            if(checkId)
                throw new HttpException(400, 'This id is already in use.');
            const checkManufactoryId = await this.manufactoryService.findById(dto.ManufactoryId);
            if(!checkManufactoryId)
                throw new HttpException(400, 'This manufactory id does not exist.');
            await this.areaService.create(dto);
            return res.json({message: 'The area was added.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error creating the area.'});
        }
    }

    async update(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: UpdateAreaDto = req.body;
            const area = await this.areaService.findById(dto.id);
            if(!area)
                throw new HttpException(400, 'This area id does not exist');
            const checkManufactoryId = await this.manufactoryService.findById(dto.ManufactoryId);
            if(!checkManufactoryId)
                throw new HttpException(400, 'This manufactory id does not exist.');
            await this.areaService.update(area, dto);
            return res.json({message: 'The area was updated.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error updating the area.'});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: DeleteAreaDto = req.body;
            const area = await this.areaService.findById(dto.id);
            if(!area)
                throw new HttpException(400, 'This area id does not exist');
            await this.areaService.delete(area);
            return res.json({message: 'The area was deleted.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error deleting the area.'});
        }
    }
}