import { Op } from "sequelize";
import { Service } from "typedi";
import { CreateProductMovementAccountingDto } from "./dto/create-product-movement-accounting.dto";
import { UpdateProductMovementAccountingDto } from "./dto/update-product-movement-accounting.dto";
import { ProductMovementAccounting } from "./product-movement-accounting.model";

const emptyProductMovementAccounting: CreateProductMovementAccountingDto = {
    id: 0,
    CompanyId: 0,
    ProductId: 0,
    State: ''
}

@Service()
export class ProductMovementAccountingService {
    async getAllProductsMovementAccounting(limit: string, findBy?: string, findValue?: string): Promise<ProductMovementAccounting[]> {
        if(!findBy || !findValue || !Object.keys(emptyProductMovementAccounting).includes(findBy))
            return await ProductMovementAccounting.findAll({limit: Number(limit)});
        return await ProductMovementAccounting.findAll({limit: Number(limit), where: {
            [findBy]: {
                [Op.like]: `%${findValue}%`
            }
        }});
    }

    async findById(id: number): Promise<ProductMovementAccounting | null> {
        const productMovementAccounting = await ProductMovementAccounting.findOne({where:{id}})
        return productMovementAccounting;
    }

    async create(dto: CreateProductMovementAccountingDto): Promise<ProductMovementAccounting> {
        return ProductMovementAccounting.create(dto);
    }

    async findbyProductId(ProductId: number) {
        const productMovementAccounting = await ProductMovementAccounting.findOne({where:{ProductId}})
        return productMovementAccounting;
    }

    async update(productMovementAccounting: ProductMovementAccounting, dto: UpdateProductMovementAccountingDto): Promise<ProductMovementAccounting>{
        return productMovementAccounting.update(dto);
    }

    async delete(productMovementAccounting: ProductMovementAccounting): Promise<void>{
        return productMovementAccounting.destroy();
    }
}