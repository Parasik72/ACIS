import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { Service } from "typedi";
import { HttpException } from '../exceptions/HttpException';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { DeleteCompanyDto } from './dto/delete-company.dto';
import { GetAllCompaniesQueryDto } from './dto/get-all-companies.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

const MAX_COMPANY_LIMIT = '100';

@Service()
export class CompanyController {
    constructor(private companyService: CompanyService){}
    async getAll(req: Request, res: Response){
        try {
            const quantityDto: GetAllCompaniesQueryDto = req.query;
            if(!quantityDto.limit || isNaN(Number(quantityDto.limit)) || Number(quantityDto.limit) > Number(MAX_COMPANY_LIMIT))
                quantityDto.limit = MAX_COMPANY_LIMIT;
            const companies = await this.companyService.getAllCompanies(quantityDto.limit, quantityDto.findBy, quantityDto.findValue);
            return res.json(companies);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting all the companies.'});
        }
    }

    async create(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: CreateCompanyDto = req.body;
            const checkId = await this.companyService.findById(dto.id);
            if(checkId)
                throw new HttpException(400, 'This id is already in use.');
            await this.companyService.create(dto);
            return res.json({message: 'The company was added.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error creating a company.'});
        }
    }

    async update(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: UpdateCompanyDto = req.body;
            const company = await this.companyService.findById(dto.id);
            if(!company)
                throw new HttpException(400, 'This company id does not exist.');
            await this.companyService.update(company, dto);
            return res.json({message: 'The company was updated.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error updating a company.'});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: DeleteCompanyDto = req.body;
            const company = await this.companyService.findById(dto.id);
            if(!company)
                throw new HttpException(400, 'This company id does not exist.');
            await this.companyService.delete(company);
            return res.json({message: 'The company was deleted.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error deleting a company.'});
        }
    }
}