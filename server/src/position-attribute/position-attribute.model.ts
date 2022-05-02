import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Attribute } from '../attribute/attribute.model';
import { EmployeePosition } from '../employee-position/employee-position.model';
import { CreatePositionAttributeDto } from './dto/create-position-attribute.dto';

@Table({tableName: 'PositionAttribute', timestamps: false})
export class PositionAttribute extends Model<CreatePositionAttributeDto>{
    @ForeignKey(() => EmployeePosition)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    declare PositionId: number;

    @ForeignKey(() => Attribute)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    declare AttributeId: number;
}