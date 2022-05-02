import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { Service } from "typedi";
import { HttpException } from '../exceptions/HttpException';
import { CreateEmployeePositionDto } from './dto/create-employee-position.dto';
import { DeleteEmployeePositionDto } from './dto/delete-employee-position.dto';
import { GetAllEmployeePositionsQueryDto } from './dto/get-all-employee-positions.dto';
import { UpdateEmployeePositionDto } from './dto/update-employee-position.dto';
import { EmployeePositionService } from './employee-position.service';

const MAX_EMPLOYEE_POSITION_LIMIT = '100';

@Service()
export class EmployeePositionController {
    constructor(private employeePositionService: EmployeePositionService){}
    async getAll(req: Request, res: Response){
        try {
            const quantityDto: GetAllEmployeePositionsQueryDto = req.query;
            if(!quantityDto.limit || isNaN(Number(quantityDto.limit)) || Number(quantityDto.limit) > Number(MAX_EMPLOYEE_POSITION_LIMIT))
                quantityDto.limit = MAX_EMPLOYEE_POSITION_LIMIT;
            const employeePositions = await this.employeePositionService.getAllEmployeePositions(quantityDto.limit, quantityDto.findBy, quantityDto.findValue);
            return res.json(employeePositions);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting all the employee positions.'});
        }
    }

    async create(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: CreateEmployeePositionDto = req.body;
            const checkId = await this.employeePositionService.findById(dto.id);
            if(checkId)
                throw new HttpException(400, 'This id is already in use.');
            await this.employeePositionService.create(dto);
            return res.json({message: 'The employee position was added.'})
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error creating an employee position.'});
        }
    }
    
    async update(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: UpdateEmployeePositionDto = req.body;
            const employeePosition = await this.employeePositionService.findById(dto.id);
            if(!employeePosition)
                throw new HttpException(400, 'This employeePosition id does not exist.');
            await this.employeePositionService.update(employeePosition, dto);
            return res.json({message: 'The employee position was updated.'})
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error updating the employee position.'});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: DeleteEmployeePositionDto = req.body;
            const employeePosition = await this.employeePositionService.findById(dto.id);
            if(!employeePosition)
                throw new HttpException(400, 'This employeePosition id does not exist.');
            await this.employeePositionService.delete(employeePosition);
            return res.json({message: 'The employee position was deleted.'})
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error deleting the employee position.'});
        }
    }
}