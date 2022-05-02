export interface IProductMovementAccounting {
    id?: number;
    ProductId: number;
    CompanyId: number;
    State: string;
}

export interface IDeleteProductMovementAccounting {
    id: number;
}

export const ProductMovementAccountingObj: IProductMovementAccounting = {
    id: 0,
    CompanyId: 0,
    ProductId: 0,
    State: ''
}