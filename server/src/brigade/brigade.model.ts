import { Column, Model, Table, DataType, ForeignKey, HasMany} from 'sequelize-typescript';
import { AreaBrigadeProduct } from '../area-brigade-product/area-brigade-product.model';
import { EmployeeAppointment } from '../employee-appointment/employee-appointment.model';
import { CreateBrigadeDto } from './dto/create-brigade.dto';

@Table({tableName: 'Brigade', timestamps: false})
export class Brigade extends Model<CreateBrigadeDto>{
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

    @HasMany(() => EmployeeAppointment)
    declare employeeAppointment: EmployeeAppointment[];

    @HasMany(() => AreaBrigadeProduct)
    declare areaBrigadePoducts: AreaBrigadeProduct[];
}