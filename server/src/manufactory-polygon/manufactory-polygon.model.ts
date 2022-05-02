import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Polygon } from '../polygon/polygon.model';
import { Manufactory } from '../manufactory/manufactory.model';
import { CreateManufactoryPolygonDto } from './dto/create-manufactory-polygon.dto';

@Table({tableName: 'ManufactoryPolygon', timestamps: false})
export class ManufactoryPolygon extends Model<CreateManufactoryPolygonDto>{
    @ForeignKey(() => Manufactory)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    declare ManufactoryId: number;

    @ForeignKey(() => Polygon)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    declare PolygonId: number;
}