import { Op } from "sequelize";
import { Service } from "typedi";
import dbInstance from "../db/instantiate-sequelize";
import { CreatePositionAttributeDto } from "./dto/create-position-attribute.dto";
import { UpdatePositionAttributeDto } from "./dto/update-position-attribute.dto";
import { PositionAttribute } from "./position-attribute.model";

const emptyPositionAttribute: CreatePositionAttributeDto = {
    AttributeId: 0,
    PositionId: 0
}

@Service()
export class PositionAttributeService {
    async getAllPositionAttributes(limit: string, findBy?: string, findValue?: string): Promise<PositionAttribute[]> {
        if(!findBy || !findValue || !Object.keys(emptyPositionAttribute).includes(findBy))
            return await PositionAttribute.findAll({limit: Number(limit)});
        return await PositionAttribute.findAll({limit: Number(limit), where: {
            [findBy]: {
                [Op.like]: `%${findValue}%`
            }
        }});
    }

    async findByDto(dto: CreatePositionAttributeDto): Promise<PositionAttribute | null>{
        return await PositionAttribute.findOne({where:{
            AttributeId: dto.AttributeId,
            PositionId: dto.PositionId
        }})
    }

    async create(dto: CreatePositionAttributeDto): Promise<PositionAttribute> {
        return PositionAttribute.create(dto);
    }

    async update(positionAttribute: PositionAttribute, dto: UpdatePositionAttributeDto): Promise<PositionAttribute[]>{
        return (await dbInstance.query(
            `UPDATE PositionAttribute
            SET AttributeId = ${dto.AttributeId},
            PositionId = ${dto.PositionId}
            WHERE AttributeId = ${positionAttribute.AttributeId}
            AND PositionId = ${positionAttribute.PositionId}`
        ))[0] as PositionAttribute[];
    }

    async delete(positionAttribute: PositionAttribute): Promise<void>{
        return positionAttribute.destroy();
    }
}