import { Column, Model, Table, DataType, HasMany, BelongsToMany} from 'sequelize-typescript';
import { Attribute } from '../attribute/attribute.model';
import { EmployeeAppointment } from '../employee-appointment/employee-appointment.model';
import { CreateEmployeePositionDto } from './dto/create-employee-position.dto';
import { PositionAttribute } from '../position-attribute/position-attribute.model';

@Table({tableName: 'EmployeePosition', timestamps: false})
export class EmployeePosition extends Model<CreateEmployeePositionDto>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare PositionName: string;

    @HasMany(() => EmployeeAppointment)
    declare employeeAppointments: EmployeeAppointment[];

    @BelongsToMany(() => Attribute, () => PositionAttribute)
    declare attributes: Attribute[];
}