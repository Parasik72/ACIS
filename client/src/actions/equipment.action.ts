import { useCallback } from "react";
import { IDeleteEquipment, IEquipment } from "../components/Equipment/Equipment.type";
import { useHttp } from "../hooks/http.hooks";
import { setData, setUnLoad } from "../store/reducers/table.reducer";

export const useEquipment = () => {
    const {request} = useHttp();
    const getEquipments = useCallback((findBy: string, findValue: string) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request(`http://127.0.0.1:5000/equipment/all?findBy=${findBy}&findValue=${findValue}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const createEquipment = useCallback(async (body: IEquipment): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/equipment`, 'POST', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const updateEquipment = useCallback(async (body: IEquipment): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/equipment`, 'PUT', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const deleteEquipment = useCallback(async (body: IDeleteEquipment): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/equipment`, 'DELETE', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    return {getEquipments, createEquipment, updateEquipment, deleteEquipment};
};