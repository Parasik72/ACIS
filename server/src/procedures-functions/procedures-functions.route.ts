import express, {Request, Response} from 'express';
import Container from 'typedi';
import { Roles } from '../middlewares/role.middleware';
import { ProceduresFunctionsController } from './procedures-functions.controller';

export const ProceduresFunctionsRouter = express();
const Controller = Container.get(ProceduresFunctionsController);

ProceduresFunctionsRouter.get('/list-of-products-of-a-separate-category', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getListOfProductsOfASeparateCategory(req, res));
ProceduresFunctionsRouter.get('/list-of-products-of-a-separate-category-certin-time-quantity', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getListOfProductsOfASeparateCategoryCertinTimeQuantity(req, res));
ProceduresFunctionsRouter.get('/list-of-products-of-a-separate-category-certin-time', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getListOfProductsOfASeparateCategoryCertinTime(req, res));
ProceduresFunctionsRouter.get('/list-of-workers', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getListOfWorkers(req, res));
ProceduresFunctionsRouter.get('/list-of-areas-quantity', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getListOfAreasQuantity(req, res));
ProceduresFunctionsRouter.get('/list-of-areas', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getListOfAreas(req, res));
ProceduresFunctionsRouter.get('/list-of-works', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getListOfWorks(req, res));
ProceduresFunctionsRouter.get('/brigade-compositions', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getBrigadeCompositions(req, res));
ProceduresFunctionsRouter.get('/list-of-masters', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getListOfMasters(req, res));
ProceduresFunctionsRouter.get('/list-of-products-of-a-separate-category-collects-now', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getListOfProductsOfASeparateCategoryCollectsNow(req, res));
ProceduresFunctionsRouter.get('/brigade-composition-collects-product', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getBrigadeCompositionCollectsProduct(req, res));
ProceduresFunctionsRouter.get('/list-of-polygons-testing-product', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getListOfPolygonsTestingProduct(req, res));
ProceduresFunctionsRouter.get('/list-of-products-of-a-separate-category-testing-in-polygons', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getListOfProductsOfASeparateCategoryTestingInPolygons(req, res));
ProceduresFunctionsRouter.get('/list-of-testers-testing-product', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getListOfTestersTestingProduct(req, res));
ProceduresFunctionsRouter.get('/list-of-equipment-using-test', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getListOfEquipmentUsingTest(req, res));
ProceduresFunctionsRouter.get('/list-of-products-collects-now-quantity', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getListOfProductsCollectsNowQuantity(req, res));
ProceduresFunctionsRouter.get('/list-of-products-collects-now', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getListOfProductsCollectsNow(req, res));