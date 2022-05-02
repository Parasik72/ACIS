import { useCallback } from "react";
import { IDeleteProductMovementAccounting, IProductMovementAccounting } from "../components/ProductMovementAccounting/ProductMovementAccounting.type";
import { useHttp } from "../hooks/http.hooks";
import { setData, setUnLoad } from "../store/reducers/table.reducer";

export const useProductMovementAccounting = () => {
    const {request} = useHttp();
    const getProuctsMovementAccouinting = useCallback((findBy: string, findValue: string) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request(`http://127.0.0.1:5000/product-movement-accounting/all?findBy=${findBy}&findValue=${findValue}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const createProuctMovementAccouinting  = useCallback(async (body: IProductMovementAccounting): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/product-movement-accounting`, 'POST', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const updateProuctMovementAccouinting  = useCallback(async (body: IProductMovementAccounting): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/product-movement-accounting`, 'PUT', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const deleteProuctMovementAccouinting  = useCallback(async (body: IDeleteProductMovementAccounting): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/product-movement-accounting`, 'DELETE', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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
        getProuctsMovementAccouinting, 
        createProuctMovementAccouinting, 
        updateProuctMovementAccouinting,
        deleteProuctMovementAccouinting
    };
};