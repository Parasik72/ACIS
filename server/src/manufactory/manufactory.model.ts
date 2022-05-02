import { Column, Model, Table, DataType, ForeignKey, HasMany} from 'sequelize-typescript';
import { Area } from '../area/area.model';
import { Company } from '../company/company.model';
import { CreateManufactoryDto } from './dto/create-manufactory.dto';

@Table({tableName: 'Manufactory', timestamps: false})
export class Manufactory extends Model<CreateManufactoryDto>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    declare id: number;

    @ForeignKey(() => Company)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare CompanyId: number;

    @HasMany(() => Area)
    declare areas: Area[];
}