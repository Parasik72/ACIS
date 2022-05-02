import { Op } from "sequelize";
import { Service } from "typedi";
import { CreateProductCategoryDto } from "./dto/create-product-category.dto";
import { UpdateProductCategoryDto } from "./dto/update-product-category.dto";
import { ProductCategory } from "./product-category.model";

const emptyProductCategory: CreateProductCategoryDto = {
    id: 0,
    Name: ''
}

@Service()
export class ProductCategoryService {
    async getAllProductCategories(limit: string, findBy?: string, findValue?: string) {
        if(!findBy || !findValue || !Object.keys(emptyProductCategory).includes(findBy))
            return await ProductCategory.findAll({limit: Number(limit)});
        return await ProductCategory.findAll({limit: Number(limit), where: {
            [findBy]: {
                [Op.like]: `%${findValue}%`
            }
        }});
    }

    async findById(id: number): Promise<ProductCategory | null> {
        const productCategory = await ProductCategory.findOne({where:{id}})
        return productCategory;
    }

    async create(dto: CreateProductCategoryDto): Promise<ProductCategory> {
        return ProductCategory.create(dto);
    }

    async update(productCategory: ProductCategory, dto: UpdateProductCategoryDto): Promise<ProductCategory>{
        return productCategory.update(dto);
    }

    async delete(productCategory: ProductCategory): Promise<void>{
        return productCategory.destroy();
    }
}