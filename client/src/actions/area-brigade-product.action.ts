import { useCallback } from "react";
import { IAreaBrigadeProduct, IUpdateAreaBrigadeProduct } from "../components/AreaBrigadeProduct/AreaBrigadeProduct.type";
import { useHttp } from "../hooks/http.hooks";
import { setData, setUnLoad } from "../store/reducers/table.reducer";

export const useAreaBrigadeProduct = () => {
    const {request} = useHttp();
    const getAreaBrigadeProducts= useCallback((findBy: string, findValue: string) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request(`http://127.0.0.1:5000/area-brigade-product/all?findBy=${findBy}&findValue=${findValue}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const createAreaBrigadeProduct = useCallback(async (body: IAreaBrigadeProduct): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/area-brigade-product`, 'POST', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const updateAreaBrigadeProduct = useCallback(async (body: IUpdateAreaBrigadeProduct): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/area-brigade-product`, 'PUT', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const deleteAreaBrigadeProduct = useCallback(async (body: IAreaBrigadeProduct): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/area-brigade-product`, 'DELETE', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    return {getAreaBrigadeProducts, createAreaBrigadeProduct, updateAreaBrigadeProduct, deleteAreaBrigadeProduct};
};