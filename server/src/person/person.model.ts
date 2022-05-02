import { Column, Model, Table, DataType, HasOne} from 'sequelize-typescript';
import { EmployeeAppointment } from '../employee-appointment/employee-appointment.model';
import { CreatePersonDto } from './dto/create-person.dto';

@Table({tableName: 'Person', timestamps: false})
export class Person extends Model<CreatePersonDto>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare Firstname: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare Lastname: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare Birthday: Date;

    @HasOne(() => EmployeeAppointment)
    declare employeeAppointment: EmployeeAppointment;
}