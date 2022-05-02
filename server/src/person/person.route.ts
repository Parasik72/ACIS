import express, {Request, Response} from 'express';
import { check } from 'express-validator';
import Container from 'typedi';
import { Roles } from '../middlewares/role.middleware';
import { PersonController } from './person.controller';

export const PersonRouter = express();
const Controller = Container.get(PersonController);

PersonRouter.get('/all', [
    Roles(['USER', 'MANAGER', 'ADMIN'])
], async (req: Request, res: Response) => Controller.getAll(req, res));

PersonRouter.post('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('Firstname', 'Bad Firstname').isString().isLength({min: 2, max: 15}),
    check('Lastname', 'Bad Lastname').isString().isLength({min: 2, max: 15}),
    check('Birthday', 'Bad Birthday').isDate()
], async (req: Request, res: Response) => Controller.create(req, res));

PersonRouter.put('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('Firstname', 'Bad Firstname').isString().isLength({min: 2, max: 15}),
    check('Lastname', 'Bad Lastname').isString().isLength({min: 2, max: 15}),
    check('Birthday', 'Bad Birthday').isDate()
], async (req: Request, res: Response) => Controller.update(req, res));

PersonRouter.delete('/', [
    Roles(['ADMIN']),
    check('id', 'Bad Id').isNumeric()
], async (req: Request, res: Response) => Controller.delete(req, res));