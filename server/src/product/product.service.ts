import { Op } from "sequelize";
import { Service } from "typedi";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./product.model";

const emptyProduct: CreateProductDto = {
    id: 0,
    CategoryId: 0,
    CollectionDate: new Date,
    Name: ''
}

@Service()
export class ProductService {
    async getAllProducts(limit: string, findBy?: string, findValue?: string): Promise<Product[]>  {
        if(!findBy || !findValue || !Object.keys(emptyProduct).includes(findBy))
            return await Product.findAll({limit: Number(limit)});
        if(findBy === 'CollectionDate')
            return await Product.findAll({limit: Number(limit), where: {
                [findBy]: new Date(findValue)
            }});
        return await Product.findAll({limit: Number(limit), where: {
            [findBy]: {
                [Op.like]: `%${findValue}%`
            }
        }});
    }

    async findById(id: number): Promise<Product | null> {
        const product = await Product.findOne({where:{id}})
        return product;
    }

    async create(dto: CreateProductDto): Promise<Product> {
        return Product.create(dto);
    }

    async update(product: Product, dto: UpdateProductDto): Promise<Product>{
        return product.update(dto);
    }

    async delete(product: Product): Promise<void>{
        return product.destroy();
    }
}