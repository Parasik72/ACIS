import express, {Request, Response} from 'express';
import { check } from 'express-validator';
import Container from 'typedi';
import { Roles } from '../middlewares/role.middleware';
import { EmployeeAppointmentController } from './employee-appointment.controller';

export const EmployeeAppointmentRouter = express();
const Controller = Container.get(EmployeeAppointmentController);

EmployeeAppointmentRouter.get('/all', [
    Roles(['USER', 'MANAGER', 'ADMIN'])
], async (req: Request, res: Response) => Controller.getAll(req, res));

EmployeeAppointmentRouter.post('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('PersonId', 'Bad PersonId').isNumeric(),
    check('EmployeePositionId', 'Bad EmployeePositionId').isNumeric(),
    check('AreaId', 'Bad AreaId').optional({nullable: true}).isNumeric(),
    check('BrigadeId', 'Bad BrigadeId').optional({nullable: true}).isNumeric(),
    check('AppointmentDate', 'Bad AppointmentDate').isDate(),
    check('DismissalDate', 'Bad DismissalDate').optional({nullable: true}).isDate(),
], async (req: Request, res: Response) => Controller.create(req, res));

EmployeeAppointmentRouter.put('/', [
    Roles(['MANAGER', 'ADMIN']),
    check('id', 'Bad Id').isNumeric(),
    check('PersonId', 'Bad PersonId').isNumeric(),
    check('EmployeePositionId', 'Bad EmployeePositionId').isNumeric(),
    check('AreaId', 'Bad AreaId').optional({nullable: true}).isNumeric(),
    check('BrigadeId', 'Bad BrigadeId').optional({nullable: true}).isNumeric(),
    check('AppointmentDate', 'Bad AppointmentDate').isDate(),
    check('DismissalDate', 'Bad DismissalDate').optional({nullable: true}).isDate()
], async (req: Request, res: Response) => Controller.update(req, res));

EmployeeAppointmentRouter.delete('/', [
    Roles(['ADMIN']),
    check('id', 'Bad Id').isNumeric()
], async (req: Request, res: Response) => Controller.delete(req, res));