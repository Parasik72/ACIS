import { useCallback } from "react";
import { IDeletePerson, IPerson } from "../components/Person/Person.type";
import { useHttp } from "../hooks/http.hooks";
import { setData, setUnLoad } from "../store/reducers/table.reducer";

export const usePerson = () => {
    const {request} = useHttp();
    const getPersons = useCallback((findBy: string, findValue: string) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request(`http://127.0.0.1:5000/person/all?findBy=${findBy}&findValue=${findValue}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error: any) {
                alert(error.message);
                console.log(error);
            }
        }
    },[request]);

    const createPerson = useCallback(async (body: IPerson): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/person`, 'POST', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const updatePerson = useCallback(async (body: IPerson): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/person`, 'PUT', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    const deletePerson = useCallback(async (body: IDeletePerson): Promise<boolean> => {
        try {
            const response = await request(`http://127.0.0.1:5000/person`, 'DELETE', body, {Authorization: `Bearer ${localStorage.getItem('token')}`});
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

    return {getPersons, createPerson, updatePerson, deletePerson}
};