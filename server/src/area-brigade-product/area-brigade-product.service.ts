import { Op } from "sequelize";
import { Service } from "typedi";
import dbInstance from "../db/instantiate-sequelize";
import { AreaBrigadeProduct } from "./area-brigade-product.model";
import { CreateAreaBrigadeProductDto } from "./dto/create-area-brigade-product.dto";
import { UpdateAreaBrigadeProductDto } from "./dto/update-area-brigade-product.dto";

const emptyAreaBrigadeProduct: CreateAreaBrigadeProductDto = {
    AreaId: 0,
    BrigadeId: 0,
    ProductId: 0
}

@Service()
export class AreaBrigadeProductService {
    async getAllAreaBrigadeProducts(limit: string, findBy?: string, findValue?: string): Promise<AreaBrigadeProduct[]> {
        if(!findBy || !findValue || !Object.keys(emptyAreaBrigadeProduct).includes(findBy))
            return await AreaBrigadeProduct.findAll({limit: Number(limit)});
        return await AreaBrigadeProduct.findAll({limit: Number(limit), where: {
            [findBy]: {
                [Op.like]: `%${findValue}%`
            }
        }});
    }

    async findByDto(dto: CreateAreaBrigadeProductDto): Promise<AreaBrigadeProduct | null> {
        const areaBrigadeProduct = await AreaBrigadeProduct.findOne({where:{
            AreaId: dto.AreaId,
            BrigadeId: dto.BrigadeId,
            ProductId: dto.ProductId
        }})
        return areaBrigadeProduct;
    }

    async findByProductId(ProductId: number) {
        const areaBrigadeProduct = await AreaBrigadeProduct.findOne({where:{ProductId}});
        return areaBrigadeProduct;
    }

    async create(dto: CreateAreaBrigadeProductDto): Promise<AreaBrigadeProduct> {
        return AreaBrigadeProduct.create(dto);
    }

    async update(areaBrigadeProduct: AreaBrigadeProduct, dto: UpdateAreaBrigadeProductDto): Promise<AreaBrigadeProduct[]>{
        return (await dbInstance.query(
            `UPDATE AreaBrigadeProduct
            SET ProductId = ${dto.ProductId},
            AreaId = ${dto.AreaId},
            BrigadeId = ${dto.BrigadeId}
            WHERE ProductId = ${areaBrigadeProduct.ProductId}
            AND AreaId = ${areaBrigadeProduct.AreaId}
            AND BrigadeId = ${areaBrigadeProduct.BrigadeId}`
        ))[0] as AreaBrigadeProduct[];
    }

    async delete(areaBrigadeProduct: AreaBrigadeProduct): Promise<void>{
        return areaBrigadeProduct.destroy();
    }
}