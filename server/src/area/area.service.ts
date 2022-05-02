import { Op } from "sequelize";
import { Service } from "typedi";
import { Area } from "./area.model";
import { CreateAreaDto } from "./dto/create-area.dto";
import { UpdateAreaDto } from "./dto/update-area.dto";

const emptyArea: CreateAreaDto = {
    id: 0,
    ManufactoryId: 0,
    Name: ''
}

@Service()
export class AreaService {
    async getAllAreas(limit: string, findBy?: string, findValue?: string): Promise<Area[]> {
        if(!findBy || !findValue || !Object.keys(emptyArea).includes(findBy))
            return await Area.findAll({limit: Number(limit)});
        return await Area.findAll({limit: Number(limit), where: {
            [findBy]: {
                [Op.like]: `%${findValue}%`
            }
        }});
    }

    async findById(id: number): Promise<Area | null> {
        const area = await Area.findOne({where:{id}})
        return area;
    }

    async create(dto: CreateAreaDto): Promise<Area> {
        return Area.create(dto);
    }

    async update(area: Area, dto: UpdateAreaDto): Promise<Area>{
        return area.update(dto);
    }

    async delete(area: Area): Promise<void>{
        return area.destroy();
    }
}