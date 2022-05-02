import { useCallback } from "react";
import { IDeleteProductCategory, IProductCategory } from "../components/ProductCategory/ProductCategory.type";
import { useHttp } from "../hooks/http.hooks";
import { setData, setUnLoad } from "../store/reducers/table.reducer";

export const useProductCategory = () => {
    const {request} = useHttp();
    const getProductCategories= useCallback((findBy: string, findValue: string) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request(`http://127.0.0.1:5000/product-category/all?findBy=${findBy}&findValue=${findValue}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const createProductCategory = useCallback(async (body: IProductCategory): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/product-category`, 'POST', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const updateProductCategory = useCallback(async (body: IProductCategory): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/product-category`, 'PUT', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const deleteProductCategory = useCallback(async (body: IDeleteProductCategory): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/product-category`, 'DELETE', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    return {getProductCategories, createProductCategory, updateProductCategory, deleteProductCategory};
};