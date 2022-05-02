import { Column, Model, Table, DataType, HasOne, HasMany, ForeignKey, BelongsToMany} from 'sequelize-typescript';
import { Area } from '../area/area.model';
import { Brigade } from '../brigade/brigade.model';
import { EmployeePosition } from '../employee-position/employee-position.model';
import { Person } from '../person/person.model';
import { TestEmployeeAppointment } from '../test-employee-appointment/test-employee-appointment.model';
import { Test } from '../test/test.model';
import { CreateEmployeeAppointmentDto } from './dto/create-employee-appointment.dto';

@Table({tableName: 'EmployeeAppointment', timestamps: false})
export class EmployeeAppointment extends Model<CreateEmployeeAppointmentDto>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    declare id: number;

    @ForeignKey(() => Person)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare PersonId: number;

    @ForeignKey(() => EmployeePosition)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare EmployeePositionId: number;

    @ForeignKey(() => Area)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: null
    })
    declare AreaId: number;

    @ForeignKey(() => Brigade)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: null
    })
    declare BrigadeId: number;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare AppointmentDate: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
        defaultValue: null
    })
    declare DismissalDate: Date;

    @BelongsToMany(() => Test, () => TestEmployeeAppointment)
    declare tests: Test[];
}