import express, {Request, Response} from 'express';
import { check } from 'express-validator';
import Container from 'typedi';
import { Roles } from '../middlewares/role.middleware';
import { AreaBrigadeProductController } from './area-brigade-product.controller';

export const AreaBrigadeProductRouter = express();
const Controller = Container.get(AreaBrigadeProductController);

AreaBrigadeProductRouter.get('/all', [
    Roles(['USER', 'MANAGER', 'ADMIN'])
],async (req: Request, res: Response) => Controller.getAll(req, res));

AreaBrigadeProductRouter.post('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('AreaId', 'Bad AreaId').isNumeric(),
    check('BrigadeId', 'Bad BrigadeId').isNumeric(),
    check('ProductId', 'Bad ProductId').isNumeric(),
], async (req: Request, res: Response) => Controller.create(req, res));

AreaBrigadeProductRouter.put('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('BeforeAreaId', 'Bad BeforeAreaId').isNumeric(),
    check('BeforeBrigadeId', 'Bad BeforeBrigadeId').isNumeric(),
    check('BeforeProductId', 'Bad BeforeProductId').isNumeric(),
    check('AreaId', 'Bad AreaId').isNumeric(),
    check('BrigadeId', 'Bad BrigadeId').isNumeric(),
    check('ProductId', 'Bad ProductId').isNumeric(),
], async (req: Request, res: Response) => Controller.update(req, res));

AreaBrigadeProductRouter.delete('/', [
    Roles(['ADMIN']),
    check('AreaId', 'Bad AreaId').isNumeric(),
    check('BrigadeId', 'Bad BrigadeId').isNumeric(),
    check('ProductId', 'Bad ProductId').isNumeric()
], async (req: Request, res: Response) => Controller.delete(req, res));