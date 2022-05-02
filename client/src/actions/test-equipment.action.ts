import { useCallback } from "react";
import { ITestEquipment, IUpdateTestEquipment } from "../components/TestEquipment/TestEquipment.type";
import { useHttp } from "../hooks/http.hooks";
import { setData, setUnLoad } from "../store/reducers/table.reducer";

export const useTestEquipment = () => {
    const {request} = useHttp();
    const getTestEquipments = useCallback((findBy: string, findValue: string) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request(`http://127.0.0.1:5000/test-equipment/all?findBy=${findBy}&findValue=${findValue}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error: any) {
                alert(error.message);
                console.log(error);
            }
        }
    },[request]);

    const createTestEquipment = useCallback(async (body: ITestEquipment): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/test-equipment`, 'POST', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const updateTestEquipment = useCallback(async (body: IUpdateTestEquipment): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/test-equipment`, 'PUT', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const deleteTestEquipment = useCallback(async (body: ITestEquipment): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/test-equipment`, 'DELETE', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    return {getTestEquipments, createTestEquipment, updateTestEquipment, deleteTestEquipment}
};