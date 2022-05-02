import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Brigade } from '../brigade/brigade.model';
import { Product } from '../product/product.model';
import { Area } from '../area/area.model';
import { CreateAreaBrigadeProductDto } from './dto/create-area-brigade-product.dto';

@Table({tableName: 'AreaBrigadeProduct', timestamps: false})
export class AreaBrigadeProduct extends Model<CreateAreaBrigadeProductDto>{
    @ForeignKey(() => Area)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    declare AreaId: number;

    @ForeignKey(() => Brigade)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    declare BrigadeId: number;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        unique: true
    })
    declare ProductId: number;
}