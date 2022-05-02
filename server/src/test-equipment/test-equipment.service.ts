import { Op } from "sequelize";
import { Service } from "typedi";
import dbInstance from "../db/instantiate-sequelize";
import { CreateTestEquipmentDto } from "./dto/create-test-equipment.dto";
import { UpdateTestEquipmentDto } from "./dto/update-test-equipment.dto";
import { TestEquipment } from "./test-equipment.model";

const emptyTestEquipment: CreateTestEquipmentDto = {
    EquipmentId: 0,
    TestId: 0
}

@Service()
export class TestEquipmentService {
    async getAllTestEquipments(limit: string, findBy?: string, findValue?: string): Promise<TestEquipment[]> {
        if(!findBy || !findValue || !Object.keys(emptyTestEquipment).includes(findBy))
            return await TestEquipment.findAll({limit: Number(limit)});
        return await TestEquipment.findAll({limit: Number(limit), where: {
            [findBy]: {
                [Op.like]: `%${findValue}%`
            }
        }});
    }

    async findByDto(dto: CreateTestEquipmentDto): Promise<TestEquipment | null> {
        const testEquipment = await TestEquipment.findOne({where:{
            TestId: dto.TestId,
            EquipmentId: dto.EquipmentId
        }})
        return testEquipment;
    }

    async create(dto: CreateTestEquipmentDto): Promise<TestEquipment> {
        return TestEquipment.create(dto);
    }

    async update(testEquipment: TestEquipment, dto: UpdateTestEquipmentDto): Promise<TestEquipment[]>{
        return (await dbInstance.query(
            `UPDATE TestEquipment
            SET EquipmentId = ${dto.EquipmentId},
            TestId = ${dto.TestId}
            WHERE EquipmentId = ${testEquipment.EquipmentId}
            AND TestId = ${testEquipment.TestId}`
        ))[0] as TestEquipment[];
    }

    async delete(testEquipment: TestEquipment): Promise<void>{
        return testEquipment.destroy();
    }
}