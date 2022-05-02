export interface IAreaBrigadeProduct {
    AreaId: number;
    BrigadeId: number;
    ProductId: number;
}

export interface IUpdateAreaBrigadeProduct {
    BeforeAreaId: number;
    BeforeBrigadeId: number;
    BeforeProductId: number;
    AreaId: number;
    BrigadeId: number;
    ProductId: number;
}

export const AreaBrigadeProductObj: IAreaBrigadeProduct = {
    AreaId: 0,
    BrigadeId: 0,
    ProductId: 0
}