import { Op } from "sequelize";
import { Service } from "typedi";
import { CreateTestDto } from "./dto/create-test.dto";
import { UpdateTestDto } from "./dto/update-test.dto";
import { Test } from "./test.model";

const emptyTest: CreateTestDto = {
    id: 0,
    Date: new Date,
    PolygonId: 0,
    ProductId: 0,
    Result: ''
}

@Service()
export class TestService {
    async getAllTests(limit: string, findBy?: string, findValue?: string): Promise<Test[]> {
        if(!findBy || !findValue || !Object.keys(emptyTest).includes(findBy))
            return await Test.findAll({limit: Number(limit)});
        if(findBy === 'Date')
            return await Test.findAll({limit: Number(limit), where: {
                [findBy]: new Date(findValue)
            }});
        return await Test.findAll({limit: Number(limit), where: {
            [findBy]: {
                [Op.like]: `%${findValue}%`
            }
        }});
    }

    async findById(id: number): Promise<Test | null> {
        const test = await Test.findOne({where:{id}})
        return test;
    }

    async create(dto: CreateTestDto): Promise<Test> {
        return Test.create(dto);
    }

    async update(test: Test, dto: UpdateTestDto): Promise<Test>{
        return test.update(dto);
    }

    async delete(test: Test): Promise<void>{
        return test.destroy();
    }
}