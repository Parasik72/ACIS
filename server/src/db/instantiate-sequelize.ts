import { Sequelize } from 'sequelize-typescript';
import { AreaBrigadeProduct } from '../area-brigade-product/area-brigade-product.model';
import { Area } from '../area/area.model';
import { Attribute } from '../attribute/attribute.model';
import { Brigade } from '../brigade/brigade.model';
import { Company } from '../company/company.model';
import { EmployeeAppointment } from '../employee-appointment/employee-appointment.model';
import { EmployeePosition } from '../employee-position/employee-position.model';
import { PositionAttribute } from '../position-attribute/position-attribute.model';
import { Equipment } from '../equipment/equipment.model';
import { ManufactoryPolygon } from '../manufactory-polygon/manufactory-polygon.model';
import { Manufactory } from '../manufactory/manufactory.model';
import { Person } from '../person/person.model';
import { Polygon } from '../polygon/polygon.model';
import { ProductCategory } from '../product-category/product-category.model';
import { ProductMovementAccounting } from '../product-movement-accounting/product-movement-accounting.model';
import { Product } from '../product/product.model';
import { TestEmployeeAppointment } from '../test-employee-appointment/test-employee-appointment.model';
import { TestEquipment } from '../test-equipment/test-equipment.model';
import { Test } from '../test/test.model';

const MSSQL_DATABASE = process.env.MSSQL_DATABASE || 'database';
const MSSQL_USERNAME = process.env.MSSQL_USERNAME || 'username';
const MSSQL_PASSWORD = process.env.MSSQL_PASSWORD || 'password';
const MSSQL_HOST = process.env.MSSQL_HOST || 'host';

const dbInstance = new Sequelize({
    database: MSSQL_DATABASE,
    username: MSSQL_USERNAME,
    password: MSSQL_PASSWORD,
    host: MSSQL_HOST,
    dialect: 'mssql',
    logging: false,
    models: [
        Person,
        EmployeePosition,
        Company,
        Manufactory,
        Area,
        Brigade,
        EmployeeAppointment,
        ProductCategory,
        Product,
        Attribute,
        PositionAttribute,
        AreaBrigadeProduct,
        Polygon,
        ManufactoryPolygon,
        Test,
        Equipment,
        TestEmployeeAppointment,
        TestEquipment,
        ProductMovementAccounting
    ]
});

export default dbInstance;