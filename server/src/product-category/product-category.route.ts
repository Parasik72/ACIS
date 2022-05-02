import express, {Request, Response} from 'express';
import { check } from 'express-validator';
import Container from 'typedi';
import { Roles } from '../middlewares/role.middleware';
import { ProductCategoryController } from './product-category.controller';

export const ProductCategoryRouter = express();
const Controller = Container.get(ProductCategoryController);

ProductCategoryRouter.get('/all', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getAll(req, res));

ProductCategoryRouter.post('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('Name', 'Bad Name').isString().isLength({min: 2, max: 30})
], async (req: Request, res: Response) => Controller.create(req, res));

ProductCategoryRouter.put('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('Name', 'Bad Name').isString().isLength({min: 2, max: 30})
], async (req: Request, res: Response) => Controller.update(req, res));

ProductCategoryRouter.delete('/', [
    Roles(['ADMIN']),
    check('id', 'Bad Id').isNumeric()
], async (req: Request, res: Response) => Controller.delete(req, res));