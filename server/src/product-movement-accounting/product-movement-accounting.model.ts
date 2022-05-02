import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Company } from '../company/company.model';
import { Product } from '../product/product.model';
import { CreateProductMovementAccountingDto } from './dto/create-product-movement-accounting.dto';

@Table({tableName: 'ProductMovementAccounting', timestamps: false})
export class ProductMovementAccounting extends Model<CreateProductMovementAccountingDto>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        unique: true
    })
    declare ProductId: number;

    @ForeignKey(() => Company)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare CompanyId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare State: string;
}