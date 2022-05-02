import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { Service } from "typedi";
import { HttpException } from '../exceptions/HttpException';
import { CreatePolygonDto } from './dto/create-polygon.dto';
import { DeletePolygonDto } from './dto/delete-polygon.dto';
import { GetAllPolygonsQueryDto } from './dto/get-all-polygons.dto';
import { UpdatePolygonDto } from './dto/update-polygon.dto';
import { PolygonService } from './polygon.service';

const MAX_POLYGON_LIMIT = '100';

@Service()
export class PolygonController {
    constructor(private polygonService: PolygonService){}
    async getAll(req: Request, res: Response){
        try {
            const quantityDto: GetAllPolygonsQueryDto = req.query;
            if(!quantityDto.limit || isNaN(Number(quantityDto.limit)) || Number(quantityDto.limit) > Number(MAX_POLYGON_LIMIT))
                quantityDto.limit = MAX_POLYGON_LIMIT;
            const polygons = await this.polygonService.getAllPolygons(quantityDto.limit, quantityDto.findBy, quantityDto.findValue);
            return res.json(polygons);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting all the polygons.'});
        }
    }

    async create(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: CreatePolygonDto = req.body;
            const checkId = await this.polygonService.findById(dto.id);
            if(checkId)
                throw new HttpException(400, 'This id is already in use.');
            await this.polygonService.create(dto);
            return res.json({message: 'The polygon was added.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error creating the polygon.'});
        }
    }

    async update(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: UpdatePolygonDto = req.body;
            const polygon = await this.polygonService.findById(dto.id);
            if(!polygon)
                throw new HttpException(400, 'This polygon id does not exist.');
            await this.polygonService.update(polygon, dto);
            return res.json({message: 'The polygon was updated.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error updating the polygon.'});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: DeletePolygonDto = req.body;
            const polygon = await this.polygonService.findById(dto.id);
            if(!polygon)
                throw new HttpException(400, 'This polygon id does not exist.');
            await this.polygonService.delete(polygon);
            return res.json({message: 'The polygon was deleted.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error deleting the polygon.'});
        }
    }
}