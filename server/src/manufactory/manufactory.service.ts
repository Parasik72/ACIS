import { Op } from "sequelize";
import { Service } from "typedi";
import { CreateManufactoryDto } from "./dto/create-manufactory.dto";
import { UpdateManufactoryDto } from "./dto/update-manufactory.dto";
import { Manufactory } from "./manufactory.model";

const emptyManufactory: CreateManufactoryDto = {
    id: 0,
    CompanyId: 0
}

@Service()
export class ManufactoryService {
    async getAllManufactories(limit: string, findBy?: string, findValue?: string) {
        if(!findBy || !findValue || !Object.keys(emptyManufactory).includes(findBy))
            return await Manufactory.findAll({limit: Number(limit)});
        return await Manufactory.findAll({limit: Number(limit), where: {
            [findBy]: {
                [Op.like]: `%${findValue}%`
            }
        }});
    }

    async findById(id: number): Promise<Manufactory | null> {
        const manufactory = await Manufactory.findOne({where:{id}})
        return manufactory;
    }

    async create(dto: CreateManufactoryDto): Promise<Manufactory> {
        return Manufactory.create(dto);
    }

    async update(manufactory: Manufactory, dto: UpdateManufactoryDto): Promise<Manufactory>{
        return manufactory.update(dto);
    }

    async delete(manufactory: Manufactory): Promise<void>{
        return manufactory.destroy();
    }
}