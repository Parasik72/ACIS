import { useCallback } from "react";
import { IPositionAttribute, IUpdatePositionAttribute } from "../components/PositionAttribute/PositionAttribute.type";
import { useHttp } from "../hooks/http.hooks";
import { setData, setUnLoad } from "../store/reducers/table.reducer";

export const usePositionAttribute = () => {
    const {request} = useHttp();
    const getPositionAttributes = useCallback((findBy: string, findValue: string) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request(`http://127.0.0.1:5000/position-attribute/all?findBy=${findBy}&findValue=${findValue}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error: any) {
                alert(error.message);
                console.log(error);
            }
        }
    },[request]);

    const createPositionAttribute = useCallback(async (body: IPositionAttribute): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/position-attribute`, 'POST', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const updatePositionAttribute = useCallback(async (body: IUpdatePositionAttribute): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/position-attribute`, 'PUT', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const deletePositionAttribute = useCallback(async (body: IPositionAttribute): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/position-attribute`, 'DELETE', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    return {getPositionAttributes, createPositionAttribute, updatePositionAttribute, deletePositionAttribute}
};