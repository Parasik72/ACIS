import { useCallback } from "react";
import { useHttp } from "../hooks/http.hooks";
import { setData, setUnLoad } from "../store/reducers/table.reducer";

interface IListOfProductsOfASeparateCategory{
    CompanyId: number;
    ManufactoryId: number;
}

interface IListOfProductsOfASeparateCategoryCertinTimeQuantity{
    CompanyId: number;
    ManufactoryId: number;
    AreaId: number;
    DateFrom: string;
    DateTo: string;
}

interface IListOfWorkers {
    EmployeePositionId: number;
}

interface IBrigadeCompositions {
    ManufactoryId: number;
    AreaId: number;
}

interface IListOfWorks {
    ProductName: string;
}

interface IListOfProductsOfASeparateCategoryCollectsNow {
    CompanyId: number;
    ManufactoryId: number;
    AreaId: number;
}

interface IListOfPolygonsTestingProduct {
    ProductId: number;
}

interface IListOfProductsOfASeparateCategoryTestingInPolygons  {
    PolygonId: number;
    DateFrom: string;
    DateTo: string;
}

interface IListOfTestersTestingProduct {
    ProductName: string;
    DateFrom: string;
    DateTo: string;
}

export const useProceduresFunctions = () => {
    const {request} = useHttp();
    const getListOfProductsOfASeparateCategory = useCallback(({CompanyId, ManufactoryId}: IListOfProductsOfASeparateCategory) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request('http://127.0.0.1:5000/procedures-functions/list-of-products-of-a-separate-category?' 
                    + `CompanyId=${CompanyId}&ManufactoryId=${ManufactoryId}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const getListOfProductsOfASeparateCategoryCertinTimeQuantity = useCallback(({CompanyId, ManufactoryId, AreaId, DateFrom, DateTo}: IListOfProductsOfASeparateCategoryCertinTimeQuantity) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request('http://127.0.0.1:5000/procedures-functions/list-of-products-of-a-separate-category-certin-time-quantity?' 
                    + `CompanyId=${CompanyId}&ManufactoryId=${ManufactoryId}&AreaId=${AreaId}&DateFrom=${DateFrom}&DateTo=${DateTo}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const getListOfProductsOfASeparateCategoryCertinTime = useCallback(({CompanyId, ManufactoryId, AreaId, DateFrom, DateTo}: IListOfProductsOfASeparateCategoryCertinTimeQuantity) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request('http://127.0.0.1:5000/procedures-functions/list-of-products-of-a-separate-category-certin-time?' 
                    + `CompanyId=${CompanyId}&ManufactoryId=${ManufactoryId}&AreaId=${AreaId}&DateFrom=${DateFrom}&DateTo=${DateTo}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const getListOfWorkers = useCallback(({EmployeePositionId}: IListOfWorkers) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request('http://127.0.0.1:5000/procedures-functions/list-of-workers?' 
                    + `EmployeePositionId=${EmployeePositionId}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const getListOfAreasQuantity = useCallback(({CompanyId, ManufactoryId}: IListOfProductsOfASeparateCategory) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request('http://127.0.0.1:5000/procedures-functions/list-of-areas-quantity?' 
                    + `CompanyId=${CompanyId}&ManufactoryId=${ManufactoryId}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const getListOfAreas = useCallback(({CompanyId, ManufactoryId}: IListOfProductsOfASeparateCategory) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request('http://127.0.0.1:5000/procedures-functions/list-of-areas?' 
                    + `CompanyId=${CompanyId}&ManufactoryId=${ManufactoryId}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const getListOfWorks = useCallback(({ProductName}: IListOfWorks) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request('http://127.0.0.1:5000/procedures-functions/list-of-works?' 
                    + `ProductName=${ProductName}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const getBrigadeCompositions = useCallback(({ManufactoryId, AreaId}: IBrigadeCompositions) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request('http://127.0.0.1:5000/procedures-functions/brigade-compositions?' 
                    + `ManufactoryId=${ManufactoryId}&AreaId=${AreaId}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const getListOfMasters = useCallback(({ManufactoryId, AreaId}: IBrigadeCompositions) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request('http://127.0.0.1:5000/procedures-functions/list-of-masters?' 
                    + `ManufactoryId=${ManufactoryId}&AreaId=${AreaId}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const getListOfProductsOfASeparateCategoryCollectsNow = useCallback(({CompanyId, ManufactoryId, AreaId}: IListOfProductsOfASeparateCategoryCollectsNow) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request('http://127.0.0.1:5000/procedures-functions/list-of-products-of-a-separate-category-collects-now?' 
                    + `CompanyId=${CompanyId}&ManufactoryId=${ManufactoryId}&AreaId=${AreaId}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const getBrigadeCompositionCollectsProduct = useCallback(({ProductName}: IListOfWorks) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request('http://127.0.0.1:5000/procedures-functions/brigade-composition-collects-product?' 
                    + `ProductName=${ProductName}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const getListOfPolygonsTestingProduct = useCallback(({ProductId}: IListOfPolygonsTestingProduct) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request('http://127.0.0.1:5000/procedures-functions/list-of-polygons-testing-product?' 
                    + `ProductId=${ProductId}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const getListOfProductsOfASeparateCategoryTestingInPolygons = useCallback(({PolygonId, DateFrom, DateTo}: IListOfProductsOfASeparateCategoryTestingInPolygons) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request('http://127.0.0.1:5000/procedures-functions/list-of-products-of-a-separate-category-testing-in-polygons?' 
                    + `PolygonId=${PolygonId}&DateFrom=${DateFrom}&DateTo=${DateTo}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const getListOfTestersTestingProduct = useCallback(({ProductName, DateFrom, DateTo}: IListOfTestersTestingProduct) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request('http://127.0.0.1:5000/procedures-functions/list-of-testers-testing-product?' 
                    + `ProductName=${ProductName}&DateFrom=${DateFrom}&DateTo=${DateTo}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const getListOfEquipmentUsingTest = useCallback(({ProductName, DateFrom, DateTo}: IListOfTestersTestingProduct) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request('http://127.0.0.1:5000/procedures-functions/list-of-equipment-using-test?' 
                    + `ProductName=${ProductName}&DateFrom=${DateFrom}&DateTo=${DateTo}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const getListOfProductsCollectsNowQuantity = useCallback(({CompanyId, ManufactoryId, AreaId}: IListOfProductsOfASeparateCategoryCollectsNow) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request('http://127.0.0.1:5000/procedures-functions/list-of-products-collects-now-quantity?' 
                    + `CompanyId=${CompanyId}&ManufactoryId=${ManufactoryId}&AreaId=${AreaId}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    const getListOfProductsCollectsNow = useCallback(({CompanyId, ManufactoryId, AreaId}: IListOfProductsOfASeparateCategoryCollectsNow) => {
        return async (dispatch: any) => {
            try {
                dispatch(setUnLoad());
                const response: Array<Object>[] = await request('http://127.0.0.1:5000/procedures-functions/list-of-products-collects-now?' 
                    + `CompanyId=${CompanyId}&ManufactoryId=${ManufactoryId}&AreaId=${AreaId}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setData(response));
            } catch (error) {
                console.log(error);
            }
        }
    },[request]);

    return {
        getListOfProductsOfASeparateCategory, 
        getListOfProductsOfASeparateCategoryCertinTimeQuantity,
        getListOfProductsOfASeparateCategoryCertinTime,
        getListOfWorkers,
        getListOfAreasQuantity,
        getListOfAreas,
        getListOfWorks,
        getBrigadeCompositions,
        getListOfMasters,
        getListOfProductsOfASeparateCategoryCollectsNow,
        getBrigadeCompositionCollectsProduct,
        getListOfPolygonsTestingProduct,
        getListOfProductsOfASeparateCategoryTestingInPolygons,
        getListOfTestersTestingProduct,
        getListOfEquipmentUsingTest,
        getListOfProductsCollectsNowQuantity,
        getListOfProductsCollectsNow
    };
};