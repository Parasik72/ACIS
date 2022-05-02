import express, {Request, Response} from 'express';
import { check } from 'express-validator';
import Container from 'typedi';
import { Roles } from '../middlewares/role.middleware';
import { ProductController } from './product.controller';

export const ProductRouter = express();
const Controller = Container.get(ProductController);

ProductRouter.get('/all', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getAll(req, res));

ProductRouter.post('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('Name', 'Bad Name').isString().isLength({min: 2, max: 40}),
    check('CategoryId', 'Bad CategoryId').isNumeric(),
    check('CollectionDate', 'Bad CollectionDate').optional({nullable: true}).isDate()
], async (req: Request, res: Response) => Controller.create(req, res));

ProductRouter.put('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('Name', 'Bad Name').isString().isLength({min: 2, max: 40}),
    check('CategoryId', 'Bad CategoryId').isNumeric(),
    check('CollectionDate', 'Bad CollectionDate').optional({nullable: true}).isDate()
], async (req: Request, res: Response) => Controller.update(req, res));

ProductRouter.delete('/', [
    Roles(['ADMIN']),
    check('id', 'Bad Id').isNumeric()
], async (req: Request, res: Response) => Controller.delete(req, res));