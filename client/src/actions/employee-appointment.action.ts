import { useCallback } from "react";
import { IDeleteEmployeeAppointment, IEmployeeAppointment } from "../components/EmployeeAppointment/EmployeeAppointment.type";
import { useHttp } from "../hooks/http.hooks";
import { setData, setUnLoad } from "../store/reducers/table.reducer";

export const useEmployeeAppointment = () => {
    const {request} = useHttp();
    const getEmployeeAppointments = useCallback((findBy: string, findValue: string) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request(`http://127.0.0.1:5000/employee-appointment/all?findBy=${findBy}&findValue=${findValue}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const createEmployeeAppointment = useCallback(async (body: IEmployeeAppointment): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/employee-appointment`, 'POST', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
            if(response instanceof Error)
                throw response;
            alert(response.message);
            return true;
        } catch (error: any) {
            alert(error);
            console.log(error);
            return false;
        }
    },[request]);

    const updateEmployeeAppointment= useCallback(async (body: IEmployeeAppointment): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/employee-appointment`, 'PUT', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const deleteEmployeeAppointment= useCallback(async (body: IDeleteEmployeeAppointment): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/employee-appointment`, 'DELETE', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    return {getEmployeeAppointments, createEmployeeAppointment, updateEmployeeAppointment, deleteEmployeeAppointment};
};