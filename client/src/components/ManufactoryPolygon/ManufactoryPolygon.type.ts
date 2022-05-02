export interface IManufactoryPolygon {
    ManufactoryId: number;
    PolygonId: number;
}

export interface IUpdateManufactoryPolygon {
    ManufactoryId: number;
    PolygonId: number;
    BeforeManufactoryId: number;
    BeforePolygonId: number;
}

export const ManufactoryPolygonObj: IManufactoryPolygon = {
    ManufactoryId: 0,
    PolygonId: 0
}