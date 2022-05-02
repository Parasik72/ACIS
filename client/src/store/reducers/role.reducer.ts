import { RoleAction, RoleActionTypes, RoleState } from "../types/role.types";

const defaultState: RoleState = {
    role: ''
}

export const roleReducer = (state = defaultState, action: RoleAction): RoleState => {
    switch (action.type) {
        case RoleActionTypes.SET_ROLE:
            return {
                ...state,
                role: action.payload
            };
        default:
            return state;
    }
};

export const setRole = (payload: string): RoleAction => ({type: RoleActionTypes.SET_ROLE, payload});