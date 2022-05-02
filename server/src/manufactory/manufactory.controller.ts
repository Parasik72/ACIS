import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { Service } from "typedi";
import { CompanyService } from '../company/company.service';
import { HttpException } from '../exceptions/HttpException';
import { CreateManufactoryDto } from './dto/create-manufactory.dto';
import { DeleteManufactoryDto } from './dto/delete-manufactory.dto';
import { GetAllManufactoriesQueryDto } from './dto/get-all-manufactories.dto';
import { UpdateManufactoryDto } from './dto/update-manufactory.dto';
import { ManufactoryService } from './manufactory.service';

const MAX_MANUFACTORY_LIMIT = '100';

@Service()
export class ManufactoryController {
    constructor(private manufactoryService: ManufactoryService,
                private companyService: CompanyService){}
    async getAll(req: Request, res: Response){
        try {
            const quantityDto: GetAllManufactoriesQueryDto = req.query;
            if(!quantityDto.limit || isNaN(Number(quantityDto.limit)) || Number(quantityDto.limit) > Number(MAX_MANUFACTORY_LIMIT))
                quantityDto.limit = MAX_MANUFACTORY_LIMIT;
            const manufactories = await this.manufactoryService.getAllManufactories(quantityDto.limit, quantityDto.findBy, quantityDto.findValue);
            return res.json(manufactories);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting all the manufactories.'});
        }
    }

    async create(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: CreateManufactoryDto = req.body;
            const checkId = await this.manufactoryService.findById(dto.id);
            if(checkId)
                throw new HttpException(400, 'This id is already in use.');
            const checkCompanyId = await this.companyService.findById(dto.CompanyId);
            if(!checkCompanyId)
                throw new HttpException(400, 'This company id does not exist.');
            await this.manufactoryService.create(dto);
            return res.json({message: 'The manufactory was added.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error creating a manufactory.'});
        }
    }
    
    async update(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: UpdateManufactoryDto = req.body;
            const manufactory = await this.manufactoryService.findById(dto.id);
            if(!manufactory)
                throw new HttpException(400, 'This manufactory id does not exist.');
            const checkCompanyId = await this.companyService.findById(dto.CompanyId);
            if(!checkCompanyId)
                throw new HttpException(400, 'This company id does not exist.');
            await this.manufactoryService.update(manufactory, dto);
            return res.json({message: 'The manufactory was updated.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error updating a manufactory.'});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: DeleteManufactoryDto = req.body;
            const manufactory = await this.manufactoryService.findById(dto.id);
            if(!manufactory)
                throw new HttpException(400, 'This manufactory id does not exist.');
            await this.manufactoryService.delete(manufactory);
            return res.json({message: 'The manufactory was deleted.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error deleting a manufactory.'});
        }
    }
}