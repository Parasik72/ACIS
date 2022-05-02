import express, {Request, Response} from 'express';
import { check } from 'express-validator';
import Container from 'typedi';
import { Roles } from '../middlewares/role.middleware';
import { ManufactoryController } from './manufactory.controller';

export const ManufactoryRouter = express();
const Controller = Container.get(ManufactoryController);

ManufactoryRouter.get('/all', [
    Roles(['USER', 'MANAGER', 'ADMIN'])
], async (req: Request, res: Response) => Controller.getAll(req, res));

ManufactoryRouter.post('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('CompanyId', 'Bad CompanyId').isNumeric()
], async (req: Request, res: Response) => Controller.create(req, res));

ManufactoryRouter.put('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('CompanyId', 'Bad CompanyId').isNumeric()
], async (req: Request, res: Response) => Controller.update(req, res));

ManufactoryRouter.delete('/', [
    Roles(['ADMIN']),
    check('id', 'Bad Id').isNumeric()
], async (req: Request, res: Response) => Controller.delete(req, res));