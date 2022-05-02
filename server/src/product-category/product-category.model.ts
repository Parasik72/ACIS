import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Product } from '../product/product.model';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';

@Table({tableName: 'ProductCategory', timestamps: false})
export class ProductCategory extends Model<CreateProductCategoryDto>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare Name: string;

    @HasMany(() => Product)
    declare products: Product[];
}