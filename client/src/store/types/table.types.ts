export enum TableActionTypes {
    SET_DATA = 'SET_DATA',
    SET_UNLOAD = 'SET_UNLOAD'
}

export interface SetTableAction {
    type: TableActionTypes.SET_DATA;
    payload: Array<Object>;
}

export interface SetTableActionUnload {
    type: TableActionTypes.SET_UNLOAD;
}

export type TableAction = SetTableAction 
                        | SetTableActionUnload;

export interface TableState {
    data: Array<Object>;
    isLoaded: boolean;
}