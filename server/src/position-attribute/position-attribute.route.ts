import express, {Request, Response} from 'express';
import { check } from 'express-validator';
import Container from 'typedi';
import { Roles } from '../middlewares/role.middleware';
import { PositionAttributeController } from './position-attribute.controller';

export const PositionAttributeRouter = express();
const Controller = Container.get(PositionAttributeController);

PositionAttributeRouter.get('/all', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getAll(req, res));

PositionAttributeRouter.post('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('PositionId', 'Bad PositionId').isNumeric(),
    check('AttributeId', 'Bad AttributeId').isNumeric()
], async (req: Request, res: Response) => Controller.create(req, res));

PositionAttributeRouter.put('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('PositionId', 'Bad PositionId').isNumeric(),
    check('AttributeId', 'Bad AttributeId').isNumeric(),
    check('BeforePositionId', 'Bad BeforePositionId').isNumeric(),
    check('BeforeAttributeId', 'Bad BeforeAttributeId').isNumeric()
], async (req: Request, res: Response) => Controller.update(req, res));

PositionAttributeRouter.delete('/', [
    Roles(['ADMIN']),
    check('PositionId', 'Bad PositionId').isNumeric(),
    check('AttributeId', 'Bad AttributeId').isNumeric()
], async (req: Request, res: Response) => Controller.delete(req, res));