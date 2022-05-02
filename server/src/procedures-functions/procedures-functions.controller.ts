import {Request, Response} from 'express';
import { Service } from "typedi";
import { GetBrigadeCompositionDto } from './dto/get-brigade-compositions.dto';
import { GetListOfAreasDto } from './dto/get-list-of-areas.dto';
import { GetListOfPolygonsTestingProductDto } from './dto/get-list-of-polygons-testing-product.dto';
import { GetListOfProductsOfASeparateCategoryCertinTimeQuantityDto } from './dto/get-list-of-product-of-a-separate-category-certin-time-quantity.dto';
import { GetListOfProductsOfASeparateCategoryCollectsNowDto } from './dto/get-list-of-products-of-a-separate-category-collects-now.dto';
import { GetListOfProductsOfASeparateCategoryTestingInPolygonsDto } from './dto/get-list-of-products-of-a-separate-category-testing-in-polygons.dto';
import { GetListOfProductsOfASeparateCategory } from './dto/get-list-of-products-of-a-separate-category.dto';
import { GetListOfTestersTestingProductDto } from './dto/get-list-of-testers-testing-product.dto';
import { GetListOfWorkers } from './dto/get-list-of-workers.dto';
import { GetListOfWorks } from './dto/get-list-of-works.dto';
import { ProceduresFunctionsService } from './procedures-functions.service';

@Service()
export class ProceduresFunctionsController {
    constructor(private proceduresFunctionsService: ProceduresFunctionsService){}
    async getListOfProductsOfASeparateCategory(req: Request, res: Response){
        try {
            const queryParams: GetListOfProductsOfASeparateCategory = req.query;
            const list = await this.proceduresFunctionsService.getListOfProductsOfASeparateCategory(queryParams);
            return res.json(list);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting the list of products of a separate category.'});
        }
    }

    async getListOfProductsOfASeparateCategoryCertinTimeQuantity(req: Request, res: Response){
        try {
            const queryParams: GetListOfProductsOfASeparateCategoryCertinTimeQuantityDto = req.query;
            const list = await this.proceduresFunctionsService.getListOfProductsOfASeparateCategoryCertinTimeQuantity(queryParams);
            return res.json(list);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting the list of products of a separate category certain time quantity.'});
        }
    }

    async getListOfProductsOfASeparateCategoryCertinTime(req: Request, res: Response){
        try {
            const queryParams: GetListOfProductsOfASeparateCategoryCertinTimeQuantityDto = req.query;
            const list = await this.proceduresFunctionsService.getListOfProductsOfASeparateCategoryCertinTime(queryParams);
            return res.json(list);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting the list of products of a separate category certain time.'});
        }
    }

    async getListOfWorkers(req: Request, res: Response){
        try {
            const queryParams: GetListOfWorkers = req.query;
            const list = await this.proceduresFunctionsService.getListOfWorkers(queryParams);
            return res.json(list);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting the list of workers.'});
        }
    }

    async getListOfAreasQuantity(req: Request, res: Response){
        try {
            const queryParams: GetListOfAreasDto = req.query;
            const list = await this.proceduresFunctionsService.getListOfAreasQuantity(queryParams);
            return res.json(list);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting the list of areas quantity.'});
        }
    }

    async getListOfAreas(req: Request, res: Response){
        try {
            const queryParams: GetListOfAreasDto = req.query;
            const list = await this.proceduresFunctionsService.getListOfAreas(queryParams);
            return res.json(list);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting the list of areas.'});
        }
    }

    async getListOfWorks(req: Request, res: Response){
        try {
            const queryParams: GetListOfWorks = req.query;
            const list = await this.proceduresFunctionsService.getListOfWorks(queryParams);
            return res.json(list);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting the list of works.'});
        }
    }

    async getBrigadeCompositions(req: Request, res: Response){
        try {
            const queryParams: GetBrigadeCompositionDto = req.query;
            const list = await this.proceduresFunctionsService.getBrigadeCompositions(queryParams);
            return res.json(list);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting the brigade compositions.'});
        }
    }

    async getListOfMasters(req: Request, res: Response){
        try {
            const queryParams: GetBrigadeCompositionDto = req.query;
            const list = await this.proceduresFunctionsService.getListOfMasters(queryParams);
            return res.json(list);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting the list of masters.'});
        }
    }

    async getListOfProductsOfASeparateCategoryCollectsNow(req: Request, res: Response){
        try {
            const queryParams: GetBrigadeCompositionDto = req.query;
            const list = await this.proceduresFunctionsService.getListOfProductsOfASeparateCategoryCollectsNow(queryParams);
            return res.json(list);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting the list of products of a separate category collects now.'});
        }
    }

    async getBrigadeCompositionCollectsProduct(req: Request, res: Response){
        try {
            const queryParams: GetListOfWorks = req.query;
            const list = await this.proceduresFunctionsService.getBrigadeCompositionCollectsProduct(queryParams);
            return res.json(list);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting the brigade composition collects product.'});
        }
    }

    async getListOfPolygonsTestingProduct(req: Request, res: Response){
        try {
            const queryParams: GetListOfPolygonsTestingProductDto = req.query;
            const list = await this.proceduresFunctionsService.getListOfPolygonsTestingProduct(queryParams);
            return res.json(list);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting the list of polygons testing product.'});
        }
    }

    async getListOfProductsOfASeparateCategoryTestingInPolygons(req: Request, res: Response){
        try {
            const queryParams: GetListOfProductsOfASeparateCategoryTestingInPolygonsDto = req.query;
            const list = await this.proceduresFunctionsService.getListOfProductsOfASeparateCategoryTestingInPolygons(queryParams);
            return res.json(list);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting the list of products of a separate category testing in polygons.'});
        }
    }

    async getListOfTestersTestingProduct(req: Request, res: Response){
        try {
            const queryParams: GetListOfTestersTestingProductDto = req.query;
            const list = await this.proceduresFunctionsService.getListOfTestersTestingProduct(queryParams);
            return res.json(list);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting the list of testers testing product.'});
        }
    }

    async getListOfEquipmentUsingTest(req: Request, res: Response){
        try {
            const queryParams: GetListOfTestersTestingProductDto = req.query;
            const list = await this.proceduresFunctionsService.getListOfEquipmentUsingTest(queryParams);
            return res.json(list);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting the list of equipment using test.'});
        }
    }

    async getListOfProductsCollectsNowQuantity(req: Request, res: Response){
        try {
            const queryParams: GetListOfProductsOfASeparateCategoryCollectsNowDto = req.query;
            const list = await this.proceduresFunctionsService.getListOfProductsCollectsNowQuantity(queryParams);
            return res.json(list);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting the list of products collects now quantity.'});
        }
    }

    async getListOfProductsCollectsNow(req: Request, res: Response){
        try {
            const queryParams: GetListOfProductsOfASeparateCategoryCollectsNowDto = req.query;
            const list = await this.proceduresFunctionsService.getListOfProductsCollectsNow(queryParams);
            return res.json(list);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error getting the list of products collects now.'});
        }
    }
}