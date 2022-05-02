import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { Service } from "typedi";
import { HttpException } from '../exceptions/HttpException';
import { ManufactoryService } from '../manufactory/manufactory.service';
import { PolygonService } from '../polygon/polygon.service';
import { CreateManufactoryPolygonDto } from './dto/create-manufactory-polygon.dto';
import { DeleteManufactoryPolygonDto } from './dto/delete-manufactory-polygon.dto copy';
import { GetAllManufactoryPolygonsQueryDto } from './dto/get-all-manufactory-polygons.dto';
import { UpdateManufactoryPolygonDto } from './dto/update-manufactory-polygon.dto';
import { ManufactoryPolygonService } from './manufactory-polygon.service';

const MAX_MANUFACTORY_POLYGON_LIMIT = '100';

@Service()
export class ManufactoryPolygonController {
    constructor(private manufactoryPolygonService: ManufactoryPolygonService,
                private manufactoryService: ManufactoryService,
                private polygonService: PolygonService){}
    async getAll(req: Request, res: Response){
        try {
            const quantityDto: GetAllManufactoryPolygonsQueryDto = req.query;
            if(!quantityDto.limit || isNaN(Number(quantityDto.limit)) || Number(quantityDto.limit) > Number(MAX_MANUFACTORY_POLYGON_LIMIT))
                quantityDto.limit = MAX_MANUFACTORY_POLYGON_LIMIT;
            const manufactoryPolygons = await this.manufactoryPolygonService.getAllManufactoryPolygons(quantityDto.limit, quantityDto.findBy, quantityDto.findValue);
            return res.json(manufactoryPolygons);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting all the manufactory polygons.'});
        }
    }

    async create(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: CreateManufactoryPolygonDto = req.body;
            const checkUnique = await this.manufactoryPolygonService.findByDto(dto);
            if(checkUnique)
                throw new HttpException(400, 'This row is already in use.');
            const checkManufactoryId = await this.manufactoryService.findById(dto.ManufactoryId);
            if(!checkManufactoryId)
                throw new HttpException(400, 'This manufactory id does not exist.');
            const checkPolygonId = await this.polygonService.findById(dto.PolygonId);
            if(!checkPolygonId)
                throw new HttpException(400, 'This polygon id does not exist.');
            await this.manufactoryPolygonService.create(dto);
            return res.json({message: 'The manufactory polygon was added.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error creating the manufactory polygon.'});
        }
    }

    async update(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: UpdateManufactoryPolygonDto = req.body;
            const manufactoryPolygon = await this.manufactoryPolygonService.findByDto({ManufactoryId: dto.BeforeManufactoryId, PolygonId: dto.BeforePolygonId});
            if(!manufactoryPolygon)
                throw new HttpException(400, 'This row does not exist.');
            if(dto.ManufactoryId !== manufactoryPolygon.ManufactoryId || dto.PolygonId !== manufactoryPolygon.PolygonId){
                const checkUnique = await this.manufactoryPolygonService.findByDto(dto);
                if(checkUnique)
                    throw new HttpException(400, 'This row is already in use.');
            }
            const checkManufactoryId = await this.manufactoryService.findById(dto.ManufactoryId);
            if(!checkManufactoryId)
                throw new HttpException(400, 'This manufactory id does not exist.');
            const checkPolygonId = await this.polygonService.findById(dto.PolygonId);
            if(!checkPolygonId)
                throw new HttpException(400, 'This polygon id does not exist.');
            await this.manufactoryPolygonService.update(manufactoryPolygon, dto);
            return res.json({message: 'The manufactory polygon was updated.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error updating the manufactory polygon.'});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: DeleteManufactoryPolygonDto = req.body;
            const manufactoryPolygon = await this.manufactoryPolygonService.findByDto(dto);
            if(!manufactoryPolygon)
                throw new HttpException(400, 'This row does not exist.');
            await this.manufactoryPolygonService.delete(manufactoryPolygon);
            return res.json({message: 'The manufactory polygon was deleted.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error deleting the manufactory polygon.'});
        }
    }
}