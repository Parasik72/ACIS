import { Column, Model, Table, DataType, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { EmployeePosition } from '../employee-position/employee-position.model';
import { PositionAttribute } from '../position-attribute/position-attribute.model';
import { Product } from '../product/product.model';
import { CreateAttributeDto } from './dto/create-attribute.dto';

@Table({tableName: 'Attribute', timestamps: false})
export class Attribute extends Model<CreateAttributeDto>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    declare id: number;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare ProductId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare Name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare Property: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare Value: string;

    @BelongsToMany(() => EmployeePosition, () => PositionAttribute)
    declare employeePositions: EmployeePosition[];
}