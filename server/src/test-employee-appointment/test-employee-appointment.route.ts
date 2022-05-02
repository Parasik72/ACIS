import express, {Request, Response} from 'express';
import { check } from 'express-validator';
import Container from 'typedi';
import { Roles } from '../middlewares/role.middleware';
import { TestEmployeeAppointmentController } from './test-employee-appointment.controller';

export const TestEmployeeAppointmentRouter = express();
const Controller = Container.get(TestEmployeeAppointmentController);

TestEmployeeAppointmentRouter.get('/all', [
    Roles(['USER', 'MANAGER', 'ADMIN']),
], async (req: Request, res: Response) => Controller.getAll(req, res));

TestEmployeeAppointmentRouter.post('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('TestId', 'Bad TestId').isNumeric(),
    check('EmployeeAppointmentId', 'Bad EmployeeAppointmentId').isNumeric(),
], async (req: Request, res: Response) => Controller.create(req, res));

TestEmployeeAppointmentRouter.put('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('TestId', 'Bad TestId').isNumeric(),
    check('EmployeeAppointmentId', 'Bad EmployeeAppointmentId').isNumeric(),
    check('BeforeTestId', 'Bad BeforeTestId').isNumeric(),
    check('BeforeEmployeeAppointmentId', 'Bad BeforeEmployeeAppointmentId').isNumeric()
], async (req: Request, res: Response) => Controller.update(req, res));

TestEmployeeAppointmentRouter.delete('/', [
    Roles(['ADMIN']),
    check('TestId', 'Bad TestId').isNumeric(),
    check('EmployeeAppointmentId', 'Bad EmployeeAppointmentId').isNumeric()
], async (req: Request, res: Response) => Controller.delete(req, res));