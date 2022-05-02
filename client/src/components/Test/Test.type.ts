export interface ITest {
    id: number;
    ProductId: number;
    PolygonId: number;
    Result: string;
    Date: string | null;
}

export interface IDeleteTest {
    id: number;
}

export const TestObj: ITest = {
    id: 0,
    Date: '',
    PolygonId: 0,
    ProductId: 0,
    Result: ''
}