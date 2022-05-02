import { useCallback } from "react";
import { setRole } from "../store/reducers/role.reducer";

export enum ERole {
    USER = 'USER',
    MANAGER = 'MANAGER',
    ADMIN = 'ADMIN'
};

export const useRole = () => {
    const checkRole = useCallback(() => {
        return (dispatch: any) => {
            let role = localStorage.getItem('token');
            if(!role || !(role in ERole)){
                localStorage.setItem('token', ERole.USER);
                role = ERole.USER;
            }
            dispatch(setRole(role));
        }
    }, []);

    const setUserRole = useCallback(() => {
        return (dispatch: any) => {
            localStorage.setItem('token', ERole.USER);
            dispatch(setRole(ERole.USER));
        }
    }, []);

    const setManagerRole = useCallback(() => {
        return (dispatch: any) => {
            localStorage.setItem('token', ERole.MANAGER);
            dispatch(setRole(ERole.MANAGER));
        }
    }, []);

    const setAdminRole = useCallback(() => {
        return (dispatch: any) => {
            localStorage.setItem('token', ERole.ADMIN);
            dispatch(setRole(ERole.ADMIN));
        }
    }, []);

    return {
        checkRole,
        setUserRole,
        setManagerRole,
        setAdminRole
    };
};