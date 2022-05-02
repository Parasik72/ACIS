import { Column, Model, Table, DataType, ForeignKey, HasMany} from 'sequelize-typescript';
import { EmployeeAppointment } from '../employee-appointment/employee-appointment.model';
import { Manufactory } from '../manufactory/manufactory.model';
import { AreaBrigadeProduct } from '../area-brigade-product/area-brigade-product.model';
import { CreateAreaDto } from './dto/create-area.dto';

@Table({tableName: 'Area', timestamps: false})
export class Area extends Model<CreateAreaDto>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    declare id: number;

    @ForeignKey(() => Manufactory)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare ManufactoryId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare Name: string;

    @HasMany(() => EmployeeAppointment)
    declare employeeAppointments: EmployeeAppointment[];

    @HasMany(() => AreaBrigadeProduct)
    declare areaBrigadePoducts: AreaBrigadeProduct[];
}