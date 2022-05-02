import { useCallback } from "react";
import { IBrigade, IDeleteBrigade } from "../components/Brigade/Brigade.type";
import { useHttp } from "../hooks/http.hooks";
import { setData, setUnLoad } from "../store/reducers/table.reducer";

export const useBrigade = () => {
    const {request} = useHttp();
    const getBrigades= useCallback((findBy: string, findValue: string) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request(`http://127.0.0.1:5000/brigade/all?findBy=${findBy}&findValue=${findValue}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const createBrigade = useCallback(async (body: IBrigade): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/brigade`, 'POST', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const updateBrigade = useCallback(async (body: IBrigade): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/brigade`, 'PUT', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const deleteBrigade = useCallback(async (body: IDeleteBrigade): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/brigade`, 'DELETE', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    return {getBrigades, createBrigade, updateBrigade, deleteBrigade};
};