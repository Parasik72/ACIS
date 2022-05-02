import { useCallback } from "react";
import { IManufactoryPolygon, IUpdateManufactoryPolygon } from "../components/ManufactoryPolygon/ManufactoryPolygon.type";
import { useHttp } from "../hooks/http.hooks";
import { setData, setUnLoad } from "../store/reducers/table.reducer";

export const useManufactoryPolygon = () => {
    const {request} = useHttp();
    const getManufactoryPolygons = useCallback((findBy: string, findValue: string) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request(`http://127.0.0.1:5000/manufactory-polygon/all?findBy=${findBy}&findValue=${findValue}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error: any) {
                alert(error.message);
                console.log(error);
            }
        }
    },[request]);

    const createManufactoryPolygon = useCallback(async (body: IManufactoryPolygon): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/manufactory-polygon`, 'POST', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const updateManufactoryPolygon = useCallback(async (body: IUpdateManufactoryPolygon): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/manufactory-polygon`, 'PUT', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const deleteManufactoryPolygon = useCallback(async (body: IManufactoryPolygon): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/manufactory-polygon`, 'DELETE', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    return {getManufactoryPolygons, createManufactoryPolygon, updateManufactoryPolygon, deleteManufactoryPolygon}
};