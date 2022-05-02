export interface IAttribute {
    id: number;
    ProductId: number;
    Name: string;
    Property: string;
    Value: string;
}

export interface IDeleteAttribute {
    id: number;
}

export const AttributeObj: IAttribute = {
    id: 0,
    Name: '',
    ProductId: 0,
    Property: '',
    Value: ''
}