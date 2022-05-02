import express, {Request, Response} from 'express';
import { check } from 'express-validator';
import Container from 'typedi';
import { Roles } from '../middlewares/role.middleware';
import { PolygonController } from './polygon.controller';

export const PolygonRouter = express();
const Controller = Container.get(PolygonController);

PolygonRouter.get('/all', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getAll(req, res));

PolygonRouter.post('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('Name', 'Bad Name').isString().isLength({min: 2, max: 30}),
], async (req: Request, res: Response) => Controller.create(req, res));

PolygonRouter.put('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('Name', 'Bad Name').isString().isLength({min: 2, max: 30}),
], async (req: Request, res: Response) => Controller.update(req, res));

PolygonRouter.delete('/', [
    Roles(['ADMIN']),
    check('id', 'Bad Id').isNumeric()
], async (req: Request, res: Response) => Controller.delete(req, res));