import { Op } from "sequelize";
import { Service } from "typedi";
import { Attribute } from "./attribute.model";
import { CreateAttributeDto } from "./dto/create-attribute.dto";
import { UpdateAttributeDto } from "./dto/update-attribute.dto";

const emptyAttribute: CreateAttributeDto = {
    id: 0,
    Name: '',
    ProductId: 0,
    Property: '',
    Value: ''
}

@Service()
export class AttributeService {
    async getAllAttributes(limit: string, findBy?: string, findValue?: string): Promise<Attribute[]> {
        if(!findBy || !findValue || !Object.keys(emptyAttribute).includes(findBy))
            return await Attribute.findAll({limit: Number(limit)});
        return await Attribute.findAll({limit: Number(limit), where: {
            [findBy]: {
                [Op.like]: `%${findValue}%`
            }
        }});
    }

    async findById(id: number): Promise<Attribute | null> {
        const attribute = await Attribute.findOne({where:{id}})
        return attribute;
    }

    async create(dto: CreateAttributeDto): Promise<Attribute> {
        return Attribute.create(dto);
    }

    async update(attribute: Attribute, dto: UpdateAttributeDto): Promise<Attribute>{
        return attribute.update(dto);
    }

    async delete(attribute: Attribute): Promise<void>{
        return attribute.destroy();
    }
}