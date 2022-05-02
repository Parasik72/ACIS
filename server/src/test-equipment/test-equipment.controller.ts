import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { Service } from "typedi";
import { EquipmentService } from '../equipment/equipment.service';
import { HttpException } from '../exceptions/HttpException';
import { TestService } from '../test/test.service';
import { CreateTestEquipmentDto } from './dto/create-test-equipment.dto';
import { DeleteTestEquipmentDto } from './dto/delete-test-equipment.dto';
import { GetAllTestEquipmentsQueryDto } from './dto/get-all-test-equipments.dto';
import { UpdateTestEquipmentDto } from './dto/update-test-equipment.dto';
import { TestEquipmentService } from './test-equipment.service';

const MAX_TEST_EQUIPMENT_LIMIT = '100';

@Service()
export class TestEquipmentController {
    constructor(private testEquipmentService: TestEquipmentService,
                private testService: TestService,
                private equipmentService: EquipmentService){}
    async getAll(req: Request, res: Response){
        try {
            const quantityDto: GetAllTestEquipmentsQueryDto = req.query;
            if(!quantityDto.limit || isNaN(Number(quantityDto.limit)) || Number(quantityDto.limit) > Number(MAX_TEST_EQUIPMENT_LIMIT))
                quantityDto.limit = MAX_TEST_EQUIPMENT_LIMIT;
            const testEquipments = await this.testEquipmentService.getAllTestEquipments(quantityDto.limit, quantityDto.findBy, quantityDto.findValue);
            return res.json(testEquipments);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting all the test equipments.'});
        }
    }

    async create(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: CreateTestEquipmentDto = req.body;
            const checkUnique = await this.testEquipmentService.findByDto(dto);
            if(checkUnique)
                throw new HttpException(400, 'This row is already in use.');
            const checkTestId = await this.testService.findById(dto.TestId);
            if(!checkTestId)
                throw new HttpException(400, 'This test id does not exist.');
            const checkEquipmentId = await this.equipmentService.findById(dto.EquipmentId);
            if(!checkEquipmentId)
                throw new HttpException(400, 'This equipment id does not exist.');
            await this.testEquipmentService.create(dto);
            return res.json({message: 'The test equipment was added.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error creating the test equipment.'});
        }
    }

    async update(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: UpdateTestEquipmentDto = req.body;
            const testEquipment = await this.testEquipmentService.findByDto({EquipmentId: dto.BeforeEquipmentId, TestId: dto.BeforeTestId});
            if(!testEquipment)
                throw new HttpException(400, 'This row does not exist.');
            if(dto.EquipmentId !== testEquipment.EquipmentId || dto.TestId !== testEquipment.TestId){
                const checkUnique = await this.testEquipmentService.findByDto(dto);
                if(checkUnique)
                    throw new HttpException(400, 'This row is already in use.');
            }
            const checkTestId = await this.testService.findById(dto.TestId);
            if(!checkTestId)
                throw new HttpException(400, 'This test id does not exist.');
            const checkEquipmentId = await this.equipmentService.findById(dto.EquipmentId);
            if(!checkEquipmentId)
                throw new HttpException(400, 'This equipment id does not exist.');
            await this.testEquipmentService.update(testEquipment, dto);
            return res.json({message: 'The test equipment was updated.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error updating the test equipment.'});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: DeleteTestEquipmentDto = req.body;
            const testEquipment = await this.testEquipmentService.findByDto(dto);
            if(!testEquipment)
                throw new HttpException(400, 'This row does not exist.');
            await this.testEquipmentService.delete(testEquipment);
            return res.json({message: 'The test equipment was deleted.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error deleting the test equipment.'});
        }
    }
}