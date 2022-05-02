import { useCallback } from "react";
import { IAttribute, IDeleteAttribute } from "../components/Attribute/Attribute.type";
import { useHttp } from "../hooks/http.hooks";
import { setData, setUnLoad } from "../store/reducers/table.reducer";

export const useAttribute= () => {
    const {request} = useHttp();
    const getAttributes = useCallback((findBy: string, findValue: string) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request(`http://127.0.0.1:5000/attribute/all?findBy=${findBy}&findValue=${findValue}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const createAttribute = useCallback(async (body: IAttribute): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/attribute`, 'POST', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const updateAttribute = useCallback(async (body: IAttribute): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/attribute`, 'PUT', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const deleteAttribute = useCallback(async (body: IDeleteAttribute): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/attribute`, 'DELETE', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    return {getAttributes, createAttribute, updateAttribute, deleteAttribute};
};