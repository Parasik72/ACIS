export enum RoleActionTypes {
    SET_ROLE = 'SET_ROLE'
}

export interface SetRoleAction {
    type: RoleActionTypes.SET_ROLE;
    payload: string;
}

export type RoleAction = SetRoleAction;

export interface RoleState {
    role: string;
}