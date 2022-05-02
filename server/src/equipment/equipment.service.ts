import { Op } from "sequelize";
import { Service } from "typedi";
import { CreateEquipmentDto } from "./dto/create-equipment.dto";
import { UpdateEquipmentDto } from "./dto/update-equipment.dto";
import { Equipment } from "./equipment.model";

const emptyEquipment: CreateEquipmentDto = {
    id: 0,
    TestId: 0,
    Type: ''
}

@Service()
export class EquipmentService {
    async getAllEquipments(limit: string, findBy?: string, findValue?: string): Promise<Equipment[]> {
        if(!findBy || !findValue || !Object.keys(emptyEquipment).includes(findBy))
            return await Equipment.findAll({limit: Number(limit)});
        return await Equipment.findAll({limit: Number(limit), where: {
            [findBy]: {
                [Op.like]: `%${findValue}%`
            }
        }});
    }

    async findById(id: number): Promise<Equipment | null> {
        const equipment = await Equipment.findOne({where:{id}})
        return equipment;
    }

    async create(dto: CreateEquipmentDto): Promise<Equipment> {
        return Equipment.create(dto);
    }

    async update(equipment: Equipment, dto: UpdateEquipmentDto): Promise<Equipment>{
        return equipment.update(dto);
    }

    async delete(equipment: Equipment): Promise<void>{
        return equipment.destroy();
    }
}