import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { Service } from "typedi";
import { AreaService } from '../area/area.service';
import { BrigadeService } from '../brigade/brigade.service';
import { EmployeePositionService } from '../employee-position/employee-position.service';
import { HttpException } from '../exceptions/HttpException';
import { PersonService } from '../person/person.service';
import { CreateEmployeeAppointmentDto } from './dto/create-employee-appointment.dto';
import { DeleteEmployeeAppointmentDto } from './dto/delete-employee-appointment.dto';
import { GetAllEmployeeAppointmentsQueryDto } from './dto/get-all-employee-appointments.dto';
import { UpdateEmployeeAppointmentDto } from './dto/update-employee-appointment.dto';
import { EmployeeAppointmentService } from './employee-appointment.service';

const MAX_EMPLOYEE_APPOINTMENT_LIMIT = '100';

@Service()
export class EmployeeAppointmentController {
    constructor(private employeeAppointmentService: EmployeeAppointmentService,
                private personService: PersonService,
                private employeePositionService: EmployeePositionService,
                private areaService: AreaService,
                private brigadeService: BrigadeService){}
    async getAll(req: Request, res: Response){
        try {
            const quantityDto: GetAllEmployeeAppointmentsQueryDto = req.query;
            if(!quantityDto.limit || isNaN(Number(quantityDto.limit)) || Number(quantityDto.limit) > Number(MAX_EMPLOYEE_APPOINTMENT_LIMIT))
                quantityDto.limit = MAX_EMPLOYEE_APPOINTMENT_LIMIT;
            const employeeAppointments = await this.employeeAppointmentService.getAllEmployeeAppointments(quantityDto.limit, quantityDto.findBy, quantityDto.findValue);
            return res.json(employeeAppointments);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting all the employee appointments.'});
        }
    }

    async create(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: CreateEmployeeAppointmentDto = req.body;
            const checkId = await this.employeeAppointmentService.findById(dto.id);
            if(checkId)
                throw new HttpException(400, 'This id is already in use.');
            const checkPersonId = await this.personService.findById(dto.PersonId);
            if(!checkPersonId)
                throw new HttpException(400, 'This person id does not exist');
            const checkPositionId = await this.employeePositionService.findById(dto.EmployeePositionId);
            if(!checkPositionId)
                throw new HttpException(400, 'This employee position id does not exist');
            if(dto.AreaId){
                const checkAreaId = await this.areaService.findById(dto.AreaId);
                if(!checkAreaId)
                    throw new HttpException(400, 'This area id does not exist');
            }
            if(dto.BrigadeId){
                const checkBrigadeId = await this.brigadeService.findById(dto.BrigadeId);
                if(!checkBrigadeId)
                    throw new HttpException(400, 'This brigade id does not exist');
            }
            await this.employeeAppointmentService.create(dto);
            return res.json({message: 'The employee appointmen was added.'})
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error creating the employee appointment.'});
        }
    }

    async update(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: UpdateEmployeeAppointmentDto = req.body;
            const employeeAppointment = await this.employeeAppointmentService.findById(dto.id);
            if(!employeeAppointment)
                throw new HttpException(400, 'This id is does not exist');
            const checkPersonId = await this.personService.findById(dto.PersonId);
            if(!checkPersonId)
                throw new HttpException(400, 'This person id does not exist');
            const checkPositionId = await this.employeePositionService.findById(dto.EmployeePositionId);
            if(!checkPositionId)
                throw new HttpException(400, 'This employee position id does not exist');
            if(dto.AreaId){
                const checkAreaId = await this.areaService.findById(dto.AreaId);
                if(!checkAreaId)
                    throw new HttpException(400, 'This area id does not exist');
            }
            if(dto.BrigadeId){
                const checkBrigadeId = await this.brigadeService.findById(dto.BrigadeId);
                if(!checkBrigadeId)
                    throw new HttpException(400, 'This brigade id does not exist');
            }
            await this.employeeAppointmentService.update(employeeAppointment, dto);
            return res.json({message: 'The employee appointment was updated.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error updating the employee appointment.'});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: DeleteEmployeeAppointmentDto = req.body;
            const employeeAppointment = await this.employeeAppointmentService.findById(dto.id);
            if(!employeeAppointment)
                throw new HttpException(400, 'This id is does not exist');
            await this.employeeAppointmentService.delete(employeeAppointment);
            return res.json({message: 'The employee appointment was deleted.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error deleting the employee appointment.'});
        }
    }
}