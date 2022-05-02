import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { Service } from "typedi";
import { EmployeeAppointmentService } from '../employee-appointment/employee-appointment.service';
import { HttpException } from '../exceptions/HttpException';
import { TestService } from '../test/test.service';
import { CreateTestAppointmentDto } from './dto/create-test-appointment.dto';
import { DeleteTestAppointmentDto } from './dto/delete-test-appointment.dto';
import { GetAllTestAppointmentsQueryDto } from './dto/get-all-test-appointments.dto';
import { UpdateTestAppointmentDto } from './dto/update-test-appointment.dto';
import { TestEmployeeAppointmentService } from './test-employee-appointment.service';

const MAX_TEST_EMPLOYEE_APPOINTMENT_LIMIT = '100';

@Service()
export class TestEmployeeAppointmentController {
    constructor(private testEmployeeAppointmentService: TestEmployeeAppointmentService,
                private testService: TestService,
                private employeeAppointmentService: EmployeeAppointmentService){}
    async getAll(req: Request, res: Response){
        try {
            const quantityDto: GetAllTestAppointmentsQueryDto = req.query;
            if(!quantityDto.limit || isNaN(Number(quantityDto.limit)) || Number(quantityDto.limit) > Number(MAX_TEST_EMPLOYEE_APPOINTMENT_LIMIT))
                quantityDto.limit = MAX_TEST_EMPLOYEE_APPOINTMENT_LIMIT;
            const testEmployeeAppointments = await this.testEmployeeAppointmentService.getAlltestEmployeeAppointments(quantityDto.limit, quantityDto.findBy, quantityDto.findValue);
            return res.json(testEmployeeAppointments);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting all the test employee appointments.'});
        }
    }

    async create(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: CreateTestAppointmentDto = req.body;
            const checkUnique = await this.testEmployeeAppointmentService.findByDto(dto);
            if(checkUnique)
                throw new HttpException(400, 'This row is already in use.');
            const checkTestId = await this.testService.findById(dto.TestId);
            if(!checkTestId)
                throw new HttpException(400, 'This test id does not exist.');
            const checkEmployeeAppointmentId = await this.employeeAppointmentService.findById(dto.EmployeeAppointmentId);
            if(!checkEmployeeAppointmentId)
                throw new HttpException(400, 'This employee appointment id does not exist.');    
            await this.testEmployeeAppointmentService.create(dto);
            return res.json({message: 'The test employee appointment was added.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error creating the test employee appointment.'});
        }
    }

    async update(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: UpdateTestAppointmentDto = req.body;
            const testEmployeeAppointment = await this.testEmployeeAppointmentService.findByDto({EmployeeAppointmentId: dto.BeforeEmployeeAppointmentId, TestId: dto.BeforeTestId});
            if(!testEmployeeAppointment)
                throw new HttpException(400, 'This row does not exist.');
            if(dto.EmployeeAppointmentId !== testEmployeeAppointment.EmployeeAppointmentId || dto.TestId !== testEmployeeAppointment.TestId){
                const checkUnique = await this.testEmployeeAppointmentService.findByDto(dto);
                if(checkUnique)
                    throw new HttpException(400, 'This row is already in use.');
            }
            const checkTestId = await this.testService.findById(dto.TestId);
            if(!checkTestId)
                throw new HttpException(400, 'This test id does not exist.');
            const checkEmployeeAppointmentId = await this.employeeAppointmentService.findById(dto.EmployeeAppointmentId);
            if(!checkEmployeeAppointmentId)
                throw new HttpException(400, 'This employee appointment id does not exist.');    
            await this.testEmployeeAppointmentService.update(testEmployeeAppointment, dto);
            return res.json({message: 'The test employee appointment was updated.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error updating the test employee appointment.'});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: DeleteTestAppointmentDto = req.body;
            const testEmployeeAppointment = await this.testEmployeeAppointmentService.findByDto(dto);
            if(!testEmployeeAppointment)
                throw new HttpException(400, 'This row does not exist.');   
            await this.testEmployeeAppointmentService.delete(testEmployeeAppointment);
            return res.json({message: 'The test employee appointment was deleted.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error deleting the test employee appointment.'});
        }
    }
}