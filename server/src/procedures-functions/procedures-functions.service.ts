import { Service } from "typedi";
import dbInstance from "../db/instantiate-sequelize";
import { GetBrigadeCompositionDto } from "./dto/get-brigade-compositions.dto";
import { GetListOfAreasDto } from "./dto/get-list-of-areas.dto";
import { GetListOfPolygonsTestingProductDto } from "./dto/get-list-of-polygons-testing-product.dto";
import { GetListOfProductsOfASeparateCategoryCertinTimeQuantityDto } from "./dto/get-list-of-product-of-a-separate-category-certin-time-quantity.dto";
import { GetListOfProductsOfASeparateCategoryCollectsNowDto } from "./dto/get-list-of-products-of-a-separate-category-collects-now.dto";
import { GetListOfProductsOfASeparateCategoryTestingInPolygonsDto } from "./dto/get-list-of-products-of-a-separate-category-testing-in-polygons.dto";
import { GetListOfProductsOfASeparateCategory } from "./dto/get-list-of-products-of-a-separate-category.dto";
import { GetListOfTestersTestingProductDto } from "./dto/get-list-of-testers-testing-product.dto";
import { GetListOfWorkers } from "./dto/get-list-of-workers.dto";
import { GetListOfWorks } from "./dto/get-list-of-works.dto";

@Service()
export class ProceduresFunctionsService {
    async getListOfProductsOfASeparateCategory(queryParams: GetListOfProductsOfASeparateCategory): Promise<unknown[]> {
        return (await dbInstance.query(
            `EXEC Query1 
            @CompanyId = ${queryParams.CompanyId ? queryParams.CompanyId : 1}, 
            @ManufactoryId = ${queryParams.ManufactoryId ? queryParams.ManufactoryId : 1}`
        ))[0];
    }

    async getListOfProductsOfASeparateCategoryCertinTimeQuantity(queryParams: GetListOfProductsOfASeparateCategoryCertinTimeQuantityDto): Promise<unknown[]> {
        return (await dbInstance.query(
            `EXEC Query2Quantity 
            @CompanyId = ${queryParams.CompanyId ? queryParams.CompanyId : 1}, 
            @ManufactoryId = ${queryParams.ManufactoryId ? queryParams.ManufactoryId : 1},
            @AreaId = ${queryParams.AreaId ? queryParams.AreaId : 1},
            @DateFrom = ${queryParams.DateFrom ? "'" +  queryParams.DateFrom + "'" : '2020-01-01'},
            @DateTo = ${queryParams.DateTo ? "'" + queryParams.DateTo + "'" : '2020-01-01'}`
        ))[0];
    }

    async getListOfProductsOfASeparateCategoryCertinTime(queryParams: GetListOfProductsOfASeparateCategoryCertinTimeQuantityDto): Promise<unknown[]> {
        return (await dbInstance.query(
            `EXEC Query2List 
            @CompanyId = ${queryParams.CompanyId ? queryParams.CompanyId : 1}, 
            @ManufactoryId = ${queryParams.ManufactoryId ? queryParams.ManufactoryId : 1},
            @AreaId = ${queryParams.AreaId ? queryParams.AreaId : 1},
            @DateFrom = ${queryParams.DateFrom ? "'" +  queryParams.DateFrom + "'" : '2020-01-01'},
            @DateTo = ${queryParams.DateTo ? "'" + queryParams.DateTo + "'" : '2020-01-01'}`
        ))[0];
    }

    async getListOfWorkers(queryParams: GetListOfWorkers): Promise<unknown[]> {
        return (await dbInstance.query(
            `EXEC Query3 
            @EmployeePositionId = ${queryParams.EmployeePositionId ? queryParams.EmployeePositionId : 1}`
        ))[0];
    }

    async getListOfAreasQuantity(queryParams: GetListOfAreasDto): Promise<unknown[]> {
        return (await dbInstance.query(
            `EXEC Query4Quantity 
            @CompanyId = ${queryParams.CompanyId ? queryParams.CompanyId : 1}, 
            @ManufactoryId = ${queryParams.ManufactoryId ? queryParams.ManufactoryId : 1}`
        ))[0];
    }

    async getListOfAreas(queryParams: GetListOfAreasDto): Promise<unknown[]> {
        return (await dbInstance.query(
            `EXEC Query4List 
            @CompanyId = ${queryParams.CompanyId ? queryParams.CompanyId : 1}, 
            @ManufactoryId = ${queryParams.ManufactoryId ? queryParams.ManufactoryId : 1}`
        ))[0];
    }

    async getListOfWorks(queryParams: GetListOfWorks): Promise<unknown[]> {
        return (await dbInstance.query(
            `EXEC Query5
            @ProductName = ${queryParams.ProductName ? "'" + queryParams.ProductName + "'" : 'Gimlet'}`
        ))[0];
    }

    async getBrigadeCompositions(queryParams: GetBrigadeCompositionDto): Promise<unknown[]> {
        return (await dbInstance.query(
            `EXEC Query6
            @ManufactoryId = ${queryParams.ManufactoryId ? queryParams.ManufactoryId : 1},
            @AreaId = ${queryParams.AreaId ? queryParams.AreaId : 1}`
        ))[0];
    }

    async getListOfMasters(queryParams: GetBrigadeCompositionDto): Promise<unknown[]> {
        return (await dbInstance.query(
            `EXEC Query7
            @ManufactoryId = ${queryParams.ManufactoryId ? queryParams.ManufactoryId : 1},
            @AreaId = ${queryParams.AreaId ? queryParams.AreaId : 1}`
        ))[0];
    }

    async getListOfProductsOfASeparateCategoryCollectsNow(queryParams: GetListOfProductsOfASeparateCategoryCollectsNowDto): Promise<unknown[]> {
        return (await dbInstance.query(
            `EXEC Query8
            @CompanyId = ${queryParams.CompanyId ? queryParams.CompanyId : 1}, 
            @ManufactoryId = ${queryParams.ManufactoryId ? queryParams.ManufactoryId : 1},
            @AreaId = ${queryParams.AreaId ? queryParams.AreaId : 1}`
        ))[0];
    }

    async getBrigadeCompositionCollectsProduct(queryParams: GetListOfWorks): Promise<unknown[]> {
        return (await dbInstance.query(
            `EXEC Query9
            @ProductName = ${queryParams.ProductName ? "'" + queryParams.ProductName + "'" : 'Gimlet'}`
        ))[0];
    }

    async getListOfPolygonsTestingProduct(queryParams: GetListOfPolygonsTestingProductDto): Promise<unknown[]> {
        return (await dbInstance.query(
            `EXEC Query10
            @ProductId = ${queryParams.ProductId ? queryParams.ProductId : 1}`
        ))[0];
    }

    async getListOfProductsOfASeparateCategoryTestingInPolygons(queryParams: GetListOfProductsOfASeparateCategoryTestingInPolygonsDto): Promise<unknown[]> {
        return (await dbInstance.query(
            `EXEC Query11
            @PolygonId = ${queryParams.PolygonId ? queryParams.PolygonId : 1},
            @DateFrom = ${queryParams.DateFrom ? "'" +  queryParams.DateFrom + "'" : '2020-01-01'},
            @DateTo = ${queryParams.DateTo ? "'" + queryParams.DateTo + "'" : '2020-01-01'}`
        ))[0];
    }

    async getListOfTestersTestingProduct(queryParams: GetListOfTestersTestingProductDto): Promise<unknown[]> {
        return (await dbInstance.query(
            `EXEC Query12
            @ProductName = ${queryParams.ProductName ? "'" + queryParams.ProductName + "'" : 'Gimlet'},
            @DateFrom = ${queryParams.DateFrom ? "'" +  queryParams.DateFrom + "'" : '2020-01-01'},
            @DateTo = ${queryParams.DateTo ? "'" + queryParams.DateTo + "'" : '2020-01-01'}`
        ))[0];
    }

    async getListOfEquipmentUsingTest(queryParams: GetListOfTestersTestingProductDto): Promise<unknown[]> {
        return (await dbInstance.query(
            `SELECT * FROM Query13_Func
            (${queryParams.ProductName ? "'" + queryParams.ProductName + "'" : 'Gimlet'}, 
            ${queryParams.DateFrom ? "'" +  queryParams.DateFrom + "'" : '2020-01-01'}, 
            ${queryParams.DateTo ? "'" + queryParams.DateTo + "'" : '2020-01-01'})`
        ))[0];
    }

    async getListOfProductsCollectsNowQuantity(queryParams: GetListOfProductsOfASeparateCategoryCollectsNowDto): Promise<unknown[]> {
        return (await dbInstance.query(
            `SELECT * FROM Query14Quantity_Func
            (${queryParams.CompanyId ? queryParams.CompanyId : 1}, 
            ${queryParams.ManufactoryId ? queryParams.ManufactoryId : 1}, 
            ${queryParams.AreaId ? queryParams.AreaId : 1})`
        ))[0];
    }

    async getListOfProductsCollectsNow(queryParams: GetListOfProductsOfASeparateCategoryCollectsNowDto): Promise<unknown[]> {
        return (await dbInstance.query(
            `SELECT * FROM Query14List_Func
            (${queryParams.CompanyId ? queryParams.CompanyId : 1}, 
            ${queryParams.ManufactoryId ? queryParams.ManufactoryId : 1}, 
            ${queryParams.AreaId ? queryParams.AreaId : 1})`
        ))[0];
    }
}