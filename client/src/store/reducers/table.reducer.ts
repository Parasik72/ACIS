import { TableAction, TableActionTypes, TableState } from "../types/table.types";

const defaultState: TableState = {
    data: [],
    isLoaded: false
}

export const tableReducer = (state = defaultState, action: TableAction): TableState => {
    switch (action.type) {
        case TableActionTypes.SET_DATA:
            return {
                ...state,
                isLoaded: true,
                data: action.payload
            };
        case TableActionTypes.SET_UNLOAD:
            return {
                ...state,
                isLoaded: false,
                data: []
            }
        default:
            return state;
    }
};

export const setData = (payload: Array<Object>[]): TableAction => ({type: TableActionTypes.SET_DATA, payload});
export const setUnLoad = (): TableAction => ({type: TableActionTypes.SET_UNLOAD});