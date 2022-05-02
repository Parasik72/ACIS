import { Op } from "sequelize";
import { Service } from "typedi";
import { Brigade } from "./brigade.model";
import { CreateBrigadeDto } from "./dto/create-brigade.dto";
import { UpdateBrigadeDto } from "./dto/update-brigade.dto";

const emptyBrigade: CreateBrigadeDto = {
    id: 0,
    Name: ''
}

@Service()
export class BrigadeService {
    async getAllBrigades(limit: string, findBy?: string, findValue?: string): Promise<Brigade[]> {
        if(!findBy || !findValue || !Object.keys(emptyBrigade).includes(findBy))
            return await Brigade.findAll({limit: Number(limit)});
        return await Brigade.findAll({limit: Number(limit), where: {
            [findBy]: {
                [Op.like]: `%${findValue}%`
            }
        }});
    }

    async findById(id: number): Promise<Brigade | null> {
        const brigade = await Brigade.findOne({where:{id}})
        return brigade;
    }

    async create(dto: CreateBrigadeDto): Promise<Brigade> {
        return Brigade.create(dto);
    }

    async update(brigade: Brigade, dto: UpdateBrigadeDto): Promise<Brigade>{
        return brigade.update(dto);
    }

    async delete(brigade: Brigade): Promise<void>{
        return brigade.destroy();
    }
}