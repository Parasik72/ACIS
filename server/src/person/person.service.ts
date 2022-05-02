import { Op } from "sequelize";
import { Service } from "typedi";
import { CreatePersonDto } from "./dto/create-person.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";
import { Person } from "./person.model";

const emptyPerson: CreatePersonDto = {
    id: 0,
    Firstname: '',
    Lastname: '',
    Birthday: new Date
}

@Service()
export class PersonService {
    async getAllPersons(limit: string, findBy?: string, findValue?: string): Promise<Person[]> {
        if(!findBy || !findValue || !Object.keys(emptyPerson).includes(findBy))
            return await Person.findAll({limit: Number(limit)});
        if(findBy === 'Birthday')
            return await Person.findAll({limit: Number(limit), where: {
                [findBy]: new Date(findValue)
            }});
        return await Person.findAll({limit: Number(limit), where: {
            [findBy]: {
                [Op.like]: `%${findValue}%`
            }
        }});
    }

    async findById(id: number): Promise<Person | null> {
        const person = await Person.findOne({where:{id}})
        return person;
    }

    async create(dto: CreatePersonDto): Promise<Person> {
        return Person.create(dto);
    }

    async update(person: Person, dto: UpdatePersonDto): Promise<Person>{
        return person.update(dto);
    }

    async delete(person: Person): Promise<void> {
        return person.destroy();
    }
}