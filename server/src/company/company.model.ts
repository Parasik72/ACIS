import { Column, Model, Table, DataType, HasOne, HasMany} from 'sequelize-typescript';
import { Manufactory } from '../manufactory/manufactory.model';
import { ProductMovementAccounting } from '../product-movement-accounting/product-movement-accounting.model';
import { CreateCompanyDto } from './dto/create-company.dto';

@Table({tableName: 'Company', timestamps: false})
export class Company extends Model<CreateCompanyDto>{
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

    @HasMany(() => Manufactory)
    declare manufactorys: Manufactory[];

    @HasMany(() => ProductMovementAccounting)
    declare productsMovementAccounting: ProductMovementAccounting[];
}