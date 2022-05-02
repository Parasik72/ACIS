import { Column, Model, Table, DataType, BelongsToMany } from 'sequelize-typescript';
import { TestEquipment } from '../test-equipment/test-equipment.model';
import { Test } from '../test/test.model';
import { CreateEquipmentDto } from './dto/create-equipment.dto';

@Table({tableName: 'Equipment', timestamps: false})
export class Equipment extends Model<CreateEquipmentDto>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare Type: string;

    @BelongsToMany(() => Test, () => TestEquipment)
    declare tests: Test[];
}