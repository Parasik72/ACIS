import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { Service } from "typedi";
import { HttpException } from '../exceptions/HttpException';
import { CreatePersonDto } from './dto/create-person.dto';
import { DeletePersonDto } from './dto/delete-person.dto';
import { GetAllPersonsQueryDto } from './dto/get-all-persons-query.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonService } from './person.service';

const MAX_PERSON_LIMIT = '100';

@Service()
export class PersonController {
    constructor(private personService: PersonService){}
    async getAll(req: Request, res: Response){
        try {
            const quantityDto: GetAllPersonsQueryDto = req.query;
            if(!quantityDto.limit || isNaN(Number(quantityDto.limit)) || Number(quantityDto.limit) > Number(MAX_PERSON_LIMIT))
                quantityDto.limit = MAX_PERSON_LIMIT;
            const persons = await this.personService.getAllPersons(quantityDto.limit, quantityDto.findBy, quantityDto.findValue);
            return res.json(persons);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting all the persons.'});
        }
    }

    async create(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: CreatePersonDto = req.body;
            const checkId = await this.personService.findById(dto.id);
            if(checkId)
                throw new HttpException(400, 'This id is already in use.');
            await this.personService.create(dto);
            return res.json({message: 'The person was added.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error creating the person.'});
        }
    }

    async update(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: UpdatePersonDto = req.body;
            const person = await this.personService.findById(dto.id);
            if(!person)
                throw new HttpException(400, 'This id is does not exist');
            await this.personService.update(person, dto);
            return res.json({message: 'The person was updated.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error updating the person.'});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                throw new HttpException(400, errors.array()[0].msg);
            const dto: DeletePersonDto = req.body;
            const person = await this.personService.findById(dto.id);
            if(!person)
                throw new HttpException(400, 'This id is does not exist');
            await this.personService.delete(person);
            return res.json({message: 'The person was deleted.'});
        } catch (error) {
            if(error instanceof HttpException)
                return res.status(error.statusCode).json({message: error.message});
            console.log(error);
            return res.status(500).json({message: 'Error deleting the person.'});
        }
    }
}