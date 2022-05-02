import { Op } from "sequelize";
import { Service } from "typedi";
import dbInstance from "../db/instantiate-sequelize";
import { CreateManufactoryPolygonDto } from "./dto/create-manufactory-polygon.dto";
import { UpdateManufactoryPolygonDto } from "./dto/update-manufactory-polygon.dto";
import { ManufactoryPolygon } from "./manufactory-polygon.model";

const emptyManufactoryPolygon: CreateManufactoryPolygonDto = {
    ManufactoryId: 0,
    PolygonId: 0
}

@Service()
export class ManufactoryPolygonService {
    async getAllManufactoryPolygons(limit: string, findBy?: string, findValue?: string): Promise<ManufactoryPolygon[]> {
        if(!findBy || !findValue || !Object.keys(emptyManufactoryPolygon).includes(findBy))
            return await ManufactoryPolygon.findAll({limit: Number(limit)});
        return await ManufactoryPolygon.findAll({limit: Number(limit), where: {
            [findBy]: {
                [Op.like]: `%${findValue}%`
            }
        }});
    }

    async findByDto(dto: CreateManufactoryPolygonDto): Promise<ManufactoryPolygon | null> {
        const manufactoryPolygon = await ManufactoryPolygon.findOne({where:{
            PolygonId: dto.PolygonId,
            ManufactoryId: dto.ManufactoryId
        }})
        return manufactoryPolygon;
    }

    async create(dto: CreateManufactoryPolygonDto): Promise<ManufactoryPolygon> {
        return ManufactoryPolygon.create(dto);
    }

    async update(manufactoryPolygon: ManufactoryPolygon, dto: UpdateManufactoryPolygonDto): Promise<ManufactoryPolygon[]>{
        return (await dbInstance.query(
            `UPDATE ManufactoryPolygon
            SET ManufactoryId = ${dto.ManufactoryId},
            PolygonId = ${dto.PolygonId}
            WHERE ManufactoryId = ${manufactoryPolygon.ManufactoryId}
            AND PolygonId = ${manufactoryPolygon.PolygonId}`
        ))[0] as ManufactoryPolygon[];
    }

    async delete(manufactoryPolygon: ManufactoryPolygon): Promise<void>{
        return manufactoryPolygon.destroy();
    }
}