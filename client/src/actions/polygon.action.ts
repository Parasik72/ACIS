import { useCallback } from "react";
import { IDeletePolygon, IPolygon } from "../components/Polygon/Polygon.type";
import { useHttp } from "../hooks/http.hooks";
import { setData, setUnLoad } from "../store/reducers/table.reducer";

export const usePolygon = () => {
    const {request} = useHttp();
    const getPolygons = useCallback((findBy: string, findValue: string) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request(`http://127.0.0.1:5000/polygon/all?findBy=${findBy}&findValue=${findValue}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const createPolygon = useCallback(async (body: IPolygon): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/polygon`, 'POST', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const updatePolygon = useCallback(async (body: IPolygon): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/polygon`, 'PUT', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const deletePolygon = useCallback(async (body: IDeletePolygon): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/polygon`, 'DELETE', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    return {getPolygons, createPolygon, updatePolygon, deletePolygon};
};