export interface IProduct {
    id: number;
    Name: string;
    CollectionDate: string | null;
    CategoryId: number;
}

export interface IDeleteProduct {
    id: number;
}

export const ProductObj: IProduct = {
    id: 0,
    CategoryId: 0,
    CollectionDate: '',
    Name: ''
}