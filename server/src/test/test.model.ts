import { Column, Model, Table, DataType, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { EmployeeAppointment } from '../employee-appointment/employee-appointment.model';
import { Equipment } from '../equipment/equipment.model';
import { Polygon } from '../polygon/polygon.model';
import { Product } from '../product/product.model';
import { CreateTestDto } from './dto/create-test.dto';
import { TestEmployeeAppointment } from '../test-employee-appointment/test-employee-appointment.model';
import { TestEquipment } from '../test-equipment/test-equipment.model';

@Table({tableName: 'Test', timestamps: false})
export class Test extends Model<CreateTestDto>{
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

    @ForeignKey(() => Polygon)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare PolygonId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare Result: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
        defaultValue: null
    })
    declare Date: Date;

    @BelongsToMany(() => Equipment, () => TestEquipment)
    declare equipments: Equipment[];

    @BelongsToMany(() => EmployeeAppointment, () => TestEmployeeAppointment)
    declare employeeAppointments: EmployeeAppointment[];
}