import { useCallback } from "react";
import { IDeleteProduct, IProduct } from "../components/Product/Product.type";
import { useHttp } from "../hooks/http.hooks";
import { setData, setUnLoad } from "../store/reducers/table.reducer";

export const useProduct= () => {
    const {request} = useHttp();
    const getProducts= useCallback((findBy: string, findValue: string) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request(`http://127.0.0.1:5000/product/all?findBy=${findBy}&findValue=${findValue}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const createProduct = useCallback(async (body: IProduct): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/product`, 'POST', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const updateProduct = useCallback(async (body: IProduct): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/product`, 'PUT', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const deleteProduct = useCallback(async (body: IDeleteProduct): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/product`, 'DELETE', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    return {getProducts, createProduct, updateProduct, deleteProduct};
};