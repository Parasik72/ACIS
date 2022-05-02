import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { EmployeeAppointment } from '../employee-appointment/employee-appointment.model';
import { Test } from '../test/test.model';
import { CreateTestAppointmentDto } from './dto/create-test-appointment.dto';

@Table({tableName: 'TestEmployeeAppointment', timestamps: false})
export class TestEmployeeAppointment extends Model<CreateTestAppointmentDto>{
    @ForeignKey(() => Test)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    declare TestId: number;

    @ForeignKey(() => EmployeeAppointment)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    declare EmployeeAppointmentId: number;
}