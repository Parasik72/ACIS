import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { Service } from "typedi";
import { HttpException } from '../exceptions/HttpException';
import { BrigadeService } from './brigade.service';
import { CreateBrigadeDto } from './dto/create-brigade.dto';
import { DeleteBrigadeDto } from './dto/delete-brigade.dto';
import { GetAllBrigadesQueryDto } from './dto/get-all-brigades.dto';
import { UpdateBrigadeDto } from './dto/update-brigade.dto';

const MAX_BRIGADE_LIMIT = '100';

@Service()
export class BrigadeController {
    constructor(private brigadeService: BrigadeService){}
    async getAll(req: Request, res: Response){
        try {
            const quantityDto: GetAllBrigadesQueryDto = req.query;
            if(!quantityDto.limit || isNaN(Number(quantityDto.limit)) || Number(quantityDto.limit) > Number(MAX_BRIGADE_LIMIT))
                quantityDto.limit = MAX_BRIGADE_LIMIT;
            const brigades = await this.brigadeService.getAllBrigades(quantityDto.limit, quantityDto.findBy, quantityDto.findValue);
            return res.json(brigades);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting all the brigades.'});
        }
    }

    async create(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: CreateBrigadeDto = req.body;
            const checkId = await this.brigadeService.findById(dto.id);
            if(checkId)
                throw new HttpException(400, 'This id is already in use.');
            await this.brigadeService.create(dto);
            return res.json({message: 'The brigade was added.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error creating a brigade.'});
        }
    }

    async update(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: UpdateBrigadeDto = req.body;
            const brigade = await this.brigadeService.findById(dto.id);
            if(!brigade)
                throw new HttpException(400, 'This brigade id does not exist.');
            await this.brigadeService.update(brigade, dto);
            return res.json({message: 'The brigade was updated.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error updating a brigade.'});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: DeleteBrigadeDto = req.body;
            const brigade = await this.brigadeService.findById(dto.id);
            if(!brigade)
                throw new HttpException(400, 'This brigade id does not exist.');
            await this.brigadeService.delete(brigade);
            return res.json({message: 'The brigade was deleted.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error deleting a brigade.'});
        }
    }
}