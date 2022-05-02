import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { Service } from "typedi";
import { HttpException } from '../exceptions/HttpException';
import { PolygonService } from '../polygon/polygon.service';
import { ProductService } from '../product/product.service';
import { CreateTestDto } from './dto/create-test.dto';
import { DeleteTestDto } from './dto/delete-test.dto';
import { GetAllTestsQueryDto } from './dto/get-all-tests.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestService } from './test.service';

const MAX_TEST_LIMIT = '100';

@Service()
export class TestController {
    constructor(private testService: TestService,
                private productService: ProductService,
                private polygonService: PolygonService){}
    async getAll(req: Request, res: Response){
        try {
            const quantityDto: GetAllTestsQueryDto = req.query;
            if(!quantityDto.limit || isNaN(Number(quantityDto.limit)) || Number(quantityDto.limit) > Number(MAX_TEST_LIMIT))
                quantityDto.limit = MAX_TEST_LIMIT;
            const tests = await this.testService.getAllTests(quantityDto.limit, quantityDto.findBy, quantityDto.findValue);
            return res.json(tests);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting all the tests.'});
        }
    }

    async create(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: CreateTestDto = req.body;
            const checkId = await this.testService.findById(dto.id);
            if(checkId)
                throw new HttpException(400, 'This id is already in use.');
            const checkProductId = await this.productService.findById(dto.ProductId);
            if(!checkProductId)
                throw new HttpException(400, 'This product id does not exist.');
            const checkPolygonId = await this.polygonService.findById(dto.PolygonId);
            if(!checkPolygonId)
                throw new HttpException(400, 'This polygon id does not exist.');
            await this.testService.create(dto);
            return res.json({message: 'The test was added.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error creating the test.'});
        }
    }

    async update(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: UpdateTestDto = req.body;
            const test = await this.testService.findById(dto.id);
            if(!test)
                throw new HttpException(400, 'This test id does not exist.');
            const checkProductId = await this.productService.findById(dto.ProductId);
            if(!checkProductId)
                throw new HttpException(400, 'This product id does not exist.');
            const checkPolygonId = await this.polygonService.findById(dto.PolygonId);
            if(!checkPolygonId)
                throw new HttpException(400, 'This polygon id does not exist.');
            await this.testService.update(test, dto);
            return res.json({message: 'The test was updated.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error updating the test.'});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: DeleteTestDto = req.body;
            const test = await this.testService.findById(dto.id);
            if(!test)
                throw new HttpException(400, 'This test id does not exist.');
            await this.testService.delete(test);
            return res.json({message: 'The test was deleted.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error deleting the test.'});
        }
    }
}