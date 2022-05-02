import { Op } from "sequelize";
import { Service } from "typedi";
import { CreateEmployeeAppointmentDto } from "./dto/create-employee-appointment.dto";
import { UpdateEmployeeAppointmentDto } from "./dto/update-employee-appointment.dto";
import { EmployeeAppointment } from "./employee-appointment.model";

const emptyEmployeeAppointment: CreateEmployeeAppointmentDto = {
    id: 0,
    PersonId: 0,
    EmployeePositionId: 0,
    AreaId: 0,
    BrigadeId: 0,
    AppointmentDate: new Date,
    DismissalDate: new Date
}

@Service()
export class EmployeeAppointmentService {
    async getAllEmployeeAppointments(limit: string, findBy?: string, findValue?: string): Promise<EmployeeAppointment[]> {
        if(!findBy || !findValue || !Object.keys(emptyEmployeeAppointment).includes(findBy))
            return await EmployeeAppointment.findAll({limit: Number(limit)});
        if(findBy === 'AppointmentDate' || findBy === 'DismissalDate')
            return await EmployeeAppointment.findAll({limit: Number(limit), where: {
                [findBy]: new Date(findValue)
            }});
        return await EmployeeAppointment.findAll({limit: Number(limit), where: {
            [findBy]: {
                [Op.like]: `%${findValue}%`
            }
        }});
    }

    async findById(id: number): Promise<EmployeeAppointment | null> {
        const employeeAppointment = await EmployeeAppointment.findOne({where:{id}})
        return employeeAppointment;
    }

    async create(dto: CreateEmployeeAppointmentDto): Promise<EmployeeAppointment> {
        return EmployeeAppointment.create(dto);
    }

    async update(employeeAppointment: EmployeeAppointment, dto: UpdateEmployeeAppointmentDto): Promise<EmployeeAppointment>{
        return employeeAppointment.update(dto);
    }

    async delete(employeeAppointment: EmployeeAppointment): Promise<void>{
        return employeeAppointment.destroy();
    }
}