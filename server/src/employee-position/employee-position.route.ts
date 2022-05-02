import express, {Request, Response} from 'express';
import { check } from 'express-validator';
import Container from 'typedi';
import { Roles } from '../middlewares/role.middleware';
import { EmployeePositionController } from './employee-position.controller';

export const EmployeePositionRouter = express();
const Controller = Container.get(EmployeePositionController);

EmployeePositionRouter.get('/all', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getAll(req, res));

EmployeePositionRouter.post('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('PositionName', 'Bad PositionName').isString().isLength({min: 2, max: 30})
], async (req: Request, res: Response) => Controller.create(req, res));

EmployeePositionRouter.put('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('PositionName', 'Bad PositionName').isString().isLength({min: 2, max: 30})
], async (req: Request, res: Response) => Controller.update(req, res));

EmployeePositionRouter.delete('/', [
    Roles(['ADMIN']),
    check('id', 'Bad Id').isNumeric()
], async (req: Request, res: Response) => Controller.delete(req, res));