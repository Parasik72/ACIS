import express, {Request, Response} from 'express';
import { check } from 'express-validator';
import Container from 'typedi';
import { Roles } from '../middlewares/role.middleware';
import { TestController } from './test.controller';

export const TestRouter = express();
const Controller = Container.get(TestController);

TestRouter.get('/all', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getAll(req, res));

TestRouter.post('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('ProductId', 'Bad ProductId').isNumeric(),
    check('PolygonId', 'Bad PolygonId').isNumeric(),
    check('Result', 'Bad Result').isString().isLength({min: 2, max: 15}),
    check('Date', 'Bad Date').optional({nullable: true}).isDate()
], async (req: Request, res: Response) => Controller.create(req, res));

TestRouter.put('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('ProductId', 'Bad ProductId').isNumeric(),
    check('PolygonId', 'Bad PolygonId').isNumeric(),
    check('Result', 'Bad Result').isString().isLength({min: 2, max: 15}),
    check('Date', 'Bad Date').optional({nullable: true}).isDate()
], async (req: Request, res: Response) => Controller.update(req, res));

TestRouter.delete('/', [
    Roles(['ADMIN']),
    check('id', 'Bad Id').isNumeric()
], async (req: Request, res: Response) => Controller.delete(req, res));