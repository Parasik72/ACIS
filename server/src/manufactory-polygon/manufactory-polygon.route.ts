import express, {Request, Response} from 'express';
import { check } from 'express-validator';
import Container from 'typedi';
import { Roles } from '../middlewares/role.middleware';
import { ManufactoryPolygonController } from './manufactory-polygon.controller';

export const ManufactoryPolygonRouter = express();
const Controller = Container.get(ManufactoryPolygonController);

ManufactoryPolygonRouter.get('/all', [
    Roles(['USER', 'MANAGER', 'ADMIN'])
], async (req: Request, res: Response) => Controller.getAll(req, res));

ManufactoryPolygonRouter.post('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('ManufactoryId', 'Bad ManufactoryId').isNumeric(),
    check('PolygonId', 'Bad PolygonId').isNumeric(),
], async (req: Request, res: Response) => Controller.create(req, res));

ManufactoryPolygonRouter.put('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('ManufactoryId', 'Bad ManufactoryId').isNumeric(),
    check('PolygonId', 'Bad PolygonId').isNumeric(),
    check('BeforeManufactoryId', 'Bad BeforeManufactoryId').isNumeric(),
    check('BeforePolygonId', 'Bad BeforePolygonId').isNumeric(),
], async (req: Request, res: Response) => Controller.update(req, res));

ManufactoryPolygonRouter.delete('/', [
    Roles(['ADMIN']),
    check('ManufactoryId', 'Bad ManufactoryId').isNumeric(),
    check('PolygonId', 'Bad PolygonId').isNumeric()
], async (req: Request, res: Response) => Controller.delete(req, res));