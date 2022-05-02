import express, {Request, Response} from 'express';
import { check } from 'express-validator';
import Container from 'typedi';
import { Roles } from '../middlewares/role.middleware';
import { BrigadeController } from './brigade.controller';

export const BrigadeRouter = express();
const Controller = Container.get(BrigadeController);

BrigadeRouter.get('/all', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
],async (req: Request, res: Response) => Controller.getAll(req, res));

BrigadeRouter.post('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('Name', 'Bad Name').isString().isLength({min: 2, max: 30})
], async (req: Request, res: Response) => Controller.create(req, res));

BrigadeRouter.put('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('Name', 'Bad Name').isString().isLength({min: 2, max: 30})
], async (req: Request, res: Response) => Controller.update(req, res));

BrigadeRouter.delete('/', [
    Roles(['ADMIN']),
    check('id', 'Bad Id').isNumeric()
], async (req: Request, res: Response) => Controller.delete(req, res));