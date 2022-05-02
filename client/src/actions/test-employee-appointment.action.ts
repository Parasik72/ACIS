import { useCallback } from "react";
import { ITestEmployeeAppointment, IUpdateTestEmployeeAppointment } from "../components/TestEmployeeAppointment/TestEmployeeAppointment.type";
import { useHttp } from "../hooks/http.hooks";
import { setData, setUnLoad } from "../store/reducers/table.reducer";

export const useTestEmployeeAppointment = () => {
    const {request} = useHttp();
    const getTestEmployeeAppointments = useCallback((findBy: string, findValue: string) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request(`http://127.0.0.1:5000/test-employee-appointment/all?findBy=${findBy}&findValue=${findValue}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error: any) {
                alert(error.message);
                console.log(error);
            }
        }
    },[request]);

    const createTestEmployeeAppointment = useCallback(async (body: ITestEmployeeAppointment): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/test-employee-appointment`, 'POST', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const updateTestEmployeeAppointment = useCallback(async (body: IUpdateTestEmployeeAppointment): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/test-employee-appointment`, 'PUT', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const deleteTestEmployeeAppointment = useCallback(async (body: ITestEmployeeAppointment): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/test-employee-appointment`, 'DELETE', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    return {
        getTestEmployeeAppointments, 
        createTestEmployeeAppointment, 
        updateTestEmployeeAppointment,
        deleteTestEmployeeAppointment
    }
};