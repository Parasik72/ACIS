import express, {Request, Response} from 'express';
import { check } from 'express-validator';
import Container from 'typedi';
import { Roles } from '../middlewares/role.middleware';
import { AttributeController } from './attribute.controller';

export const AttributeRouter = express();
const Controller = Container.get(AttributeController);

AttributeRouter.get('/all', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
],async (req: Request, res: Response) => Controller.getAll(req, res));

AttributeRouter.post('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('ProductId', 'Bad ProductId').isNumeric(),
    check('Name', 'Bad Name').isString().isLength({min: 2, max: 40}),
    check('Property', 'Bad Property').isString().isLength({min: 2, max: 40}),
    check('Value', 'Bad Value').isString().isLength({min: 1, max: 40})
], async (req: Request, res: Response) => Controller.create(req, res));

AttributeRouter.put('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('ProductId', 'Bad ProductId').isNumeric(),
    check('Name', 'Bad Name').isString().isLength({min: 2, max: 40}),
    check('Property', 'Bad Property').isString().isLength({min: 2, max: 40}),
    check('Value', 'Bad Value').isString().isLength({min: 1, max: 40})
], async (req: Request, res: Response) => Controller.update(req, res));

AttributeRouter.delete('/', [
    Roles(['ADMIN']),
    check('id', 'Bad Id').isNumeric()
], async (req: Request, res: Response) => Controller.delete(req, res));