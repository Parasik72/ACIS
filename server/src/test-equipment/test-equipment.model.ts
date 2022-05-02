import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Equipment } from '../equipment/equipment.model';
import { Test } from '../test/test.model';
import { CreateTestEquipmentDto } from './dto/create-test-equipment.dto';

@Table({tableName: 'TestEquipment', timestamps: false})
export class TestEquipment extends Model<CreateTestEquipmentDto>{
    @ForeignKey(() => Test)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    declare TestId: number;

    @ForeignKey(() => Equipment)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    declare EquipmentId: number;
}