import express, {Request, Response} from 'express';
import { check } from 'express-validator';
import Container from 'typedi';
import { Roles } from '../middlewares/role.middleware';
import { EquipmentController } from './equipment.controller';

export const EquipmentRouter = express();
const Controller = Container.get(EquipmentController);

EquipmentRouter.get('/all', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getAll(req, res));

EquipmentRouter.post('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('Type', 'Bad Type').isString().isLength({min: 2, max: 30})
], async (req: Request, res: Response) => Controller.create(req, res));

EquipmentRouter.put('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('Type', 'Bad Type').isString().isLength({min: 2, max: 30})
], async (req: Request, res: Response) => Controller.update(req, res));

EquipmentRouter.delete('/', [
    Roles(['ADMIN']),
    check('id', 'Bad Id').isNumeric()
], async (req: Request, res: Response) => Controller.delete(req, res));