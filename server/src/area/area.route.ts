import express, {Request, Response} from 'express';
import { check } from 'express-validator';
import Container from 'typedi';
import { Roles } from '../middlewares/role.middleware';
import { AreaController } from './area.controller';

export const AreaRouter = express();
const Controller = Container.get(AreaController);

AreaRouter.get('/all', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
],async (req: Request, res: Response) => Controller.getAll(req, res));

AreaRouter.post('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('ManufactoryId', 'Bad ManufactoryId').isNumeric(),
    check('Name', 'Bad Name').isString().isLength({min: 2, max: 30})
], async (req: Request, res: Response) => Controller.create(req, res));

AreaRouter.put('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('ManufactoryId', 'Bad ManufactoryId').isNumeric(),
    check('Name', 'Bad Name').isString().isLength({min: 2, max: 30})
], async (req: Request, res: Response) => Controller.update(req, res));

AreaRouter.delete('/', [
    Roles(['ADMIN']),
    check('id', 'Bad Id').isNumeric()
], async (req: Request, res: Response) => Controller.delete(req, res));