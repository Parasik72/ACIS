import express, {Request, Response} from 'express';
import { check } from 'express-validator';
import Container from 'typedi';
import { Roles } from '../middlewares/role.middleware';
import { ProductMovementAccountingController } from './product-movement-accounting.controller';

export const ProductMovementAccountingRouter = express();
const Controller = Container.get(ProductMovementAccountingController);

ProductMovementAccountingRouter.get('/all', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getAll(req, res));

ProductMovementAccountingRouter.post('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('ProductId', 'Bad ProductId').isNumeric(),
    check('CompanyId', 'Bad CompanyId').isNumeric(),
    check('State', 'Bad State').isString().isLength({min: 2, max: 15}),
], async (req: Request, res: Response) => Controller.create(req, res));

ProductMovementAccountingRouter.put('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('ProductId', 'Bad ProductId').isNumeric(),
    check('CompanyId', 'Bad CompanyId').isNumeric(),
    check('State', 'Bad State').isString().isLength({min: 2, max: 15}),
], async (req: Request, res: Response) => Controller.update(req, res));

ProductMovementAccountingRouter.delete('/', [
    Roles(['ADMIN']),
    check('id', 'Bad Id').isNumeric()
], async (req: Request, res: Response) => Controller.delete(req, res));