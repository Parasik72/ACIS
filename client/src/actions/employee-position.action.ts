import { useCallback } from "react";
import { IDeleteEmployeePosition, IEmployeePosition } from "../components/EmployeePosition/EmployeePosition.type";
import { useHttp } from "../hooks/http.hooks";
import { setData, setUnLoad } from "../store/reducers/table.reducer";

export const useEmployeePosition = () => {
    const {request} = useHttp();
    const getEmployeePositions= useCallback((findBy: string, findValue: string) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request(`http://127.0.0.1:5000/employee-position/all?findBy=${findBy}&findValue=${findValue}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const createEmployeePosition = useCallback(async (body: IEmployeePosition): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/employee-position`, 'POST', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
            if(response instanceof Error)
                throw response;
            alert(response.message);
            return true;
        } catch (error: any) {
            alert(error.message);
            console.log(error);
            return false;
        }
    },[request]);

    const updateEmployeePosition = useCallback(async (body: IEmployeePosition): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/employee-position`, 'PUT', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
            if(response instanceof Error)
                throw response;
            alert(response.message);
            return true;
        } catch (error: any) {
            alert(error.message);
            console.log(error);
            return false;
        }
    },[request]);

    const deleteEmployeePosition = useCallback(async (body: IDeleteEmployeePosition): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/employee-position`, 'DELETE', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
            if(response instanceof Error)
                throw response;
            alert(response.message);
            return true;
        } catch (error: any) {
            alert(error.message);
            console.log(error);
            return false;
        }
    },[request]);

    return {getEmployeePositions, createEmployeePosition, updateEmployeePosition, deleteEmployeePosition};
};