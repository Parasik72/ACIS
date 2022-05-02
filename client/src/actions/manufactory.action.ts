import { useCallback } from "react";
import { IDeleteManufactory, IManufactory } from "../components/Manufactory/Manufactory.type";
import { useHttp } from "../hooks/http.hooks";
import { setData, setUnLoad } from "../store/reducers/table.reducer";

export const useManufactory = () => {
    const {request} = useHttp();
    const getManufactories= useCallback((findBy: string, findValue: string) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request(`http://127.0.0.1:5000/manufactory/all?findBy=${findBy}&findValue=${findValue}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const createManufactory = useCallback(async (body: IManufactory): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/manufactory`, 'POST', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const updateManufactory = useCallback(async (body: IManufactory): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/manufactory`, 'PUT', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const deleteManufactory = useCallback(async (body: IDeleteManufactory): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/manufactory`, 'DELETE', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    return {getManufactories, createManufactory, updateManufactory, deleteManufactory};
};