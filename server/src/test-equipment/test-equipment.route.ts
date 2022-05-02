import express, {Request, Response} from 'express';
import { check } from 'express-validator';
import Container from 'typedi';
import { Roles } from '../middlewares/role.middleware';
import { TestEquipmentController } from './test-equipment.controller';

export const TestEquipmentRouter = express();
const Controller = Container.get(TestEquipmentController);

TestEquipmentRouter.get('/all', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getAll(req, res));

TestEquipmentRouter.post('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('TestId', 'Bad TestId').isNumeric(),
    check('EquipmentId', 'Bad EquipmentId').isNumeric(),
], async (req: Request, res: Response) => Controller.create(req, res));

TestEquipmentRouter.put('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('TestId', 'Bad TestId').isNumeric(),
    check('EquipmentId', 'Bad EquipmentId').isNumeric(),
    check('BeforeTestId', 'Bad BeforeTestId').isNumeric(),
    check('BeforeEquipmentId', 'Bad BeforeEquipmentId').isNumeric(),
], async (req: Request, res: Response) => Controller.update(req, res));

TestEquipmentRouter.delete('/', [
    Roles(['ADMIN']),
    check('TestId', 'Bad TestId').isNumeric(),
    check('EquipmentId', 'Bad EquipmentId').isNumeric()
], async (req: Request, res: Response) => Controller.delete(req, res));