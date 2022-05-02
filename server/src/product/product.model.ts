import { Column, Model, Table, DataType, ForeignKey, HasMany, HasOne } from 'sequelize-typescript';
import { AreaBrigadeProduct } from '../area-brigade-product/area-brigade-product.model';
import { Attribute } from '../attribute/attribute.model';
import { ProductCategory } from '../product-category/product-category.model';
import { Test } from '../test/test.model';
import { ProductMovementAccounting } from '../product-movement-accounting/product-movement-accounting.model';
import { CreateProductDto } from './dto/create-product.dto';

@Table({tableName: 'Product', timestamps: false})
export class Product extends Model<CreateProductDto>{
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

    @Column({
        type: DataType.DATE,
        allowNull: true,
        defaultValue: null
    })
    declare CollectionDate: Date;

    @ForeignKey(() => ProductCategory)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare CategoryId: number;

    @HasMany(() => Attribute)
    declare attributes: Attribute[];

    @HasMany(() => Test)
    declare tests: Test[];

    @HasOne(() => AreaBrigadeProduct)
    declare areaBrigadePoduct: AreaBrigadeProduct;

    @HasOne(() => ProductMovementAccounting)
    declare productMovementAccounting: ProductMovementAccounting;
}