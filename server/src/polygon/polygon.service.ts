import { Op } from "sequelize";
import { Service } from "typedi";
import { CreatePolygonDto } from "./dto/create-polygon.dto";
import { UpdatePolygonDto } from "./dto/update-polygon.dto";
import { Polygon } from "./polygon.model";

const emptyPolygon: CreatePolygonDto = {
    id: 0,
    Name: ''
}

@Service()
export class PolygonService {
    async getAllPolygons(limit: string, findBy?: string, findValue?: string): Promise<Polygon[]>  {
        if(!findBy || !findValue || !Object.keys(emptyPolygon).includes(findBy))
            return await Polygon.findAll({limit: Number(limit)});
        return await Polygon.findAll({limit: Number(limit), where: {
            [findBy]: {
                [Op.like]: `%${findValue}%`
            }
        }});
    }

    async findById(id: number): Promise<Polygon | null> {
        const polygon = await Polygon.findOne({where:{id}})
        return polygon;
    }

    async create(dto: CreatePolygonDto): Promise<Polygon> {
        return Polygon.create(dto);
    }

    async update(polygon: Polygon, dto: UpdatePolygonDto): Promise<Polygon>{
        return polygon.update(dto);
    }

    async delete(polygon: Polygon): Promise<void>{
        return polygon.destroy();
    }
}