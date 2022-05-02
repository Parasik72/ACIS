import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { CreatePolygonDto } from './dto/create-polygon.dto';

@Table({tableName: 'Polygon', timestamps: false})
export class Polygon extends Model<CreatePolygonDto>{
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
}