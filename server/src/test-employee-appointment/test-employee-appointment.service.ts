import { Op } from "sequelize";
import { Service } from "typedi";
import dbInstance from "../db/instantiate-sequelize";
import { CreateTestAppointmentDto } from "./dto/create-test-appointment.dto";
import { UpdateTestAppointmentDto } from "./dto/update-test-appointment.dto";
import { TestEmployeeAppointment } from "./test-employee-appointment.model";

const emptyPerson: CreateTestAppointmentDto = {
    EmployeeAppointmentId: 0,
    TestId: 0
}

@Service()
export class TestEmployeeAppointmentService {
    async getAlltestEmployeeAppointments(limit: string, findBy?: string, findValue?: string): Promise<TestEmployeeAppointment[]> {
        if(!findBy || !findValue || !Object.keys(emptyPerson).includes(findBy))
            return await TestEmployeeAppointment.findAll({limit: Number(limit)});
        return await TestEmployeeAppointment.findAll({limit: Number(limit), where: {
            [findBy]: {
                [Op.like]: `%${findValue}%`
            }
        }});
    }

    async findByDto(dto: CreateTestAppointmentDto): Promise<TestEmployeeAppointment | null> {
        const testEmployeeAppointment = await TestEmployeeAppointment.findOne({where:{
            EmployeeAppointmentId: dto.EmployeeAppointmentId,
            TestId: dto.TestId
        }})
        return testEmployeeAppointment;
    }

    async create(dto: CreateTestAppointmentDto): Promise<TestEmployeeAppointment> {
        return TestEmployeeAppointment.create(dto);
    }

    async update(testEmployeeAppointment: TestEmployeeAppointment, dto: UpdateTestAppointmentDto): Promise<TestEmployeeAppointment[]>{
        return (await dbInstance.query(
            `UPDATE TestEmployeeAppointment
            SET TestId = ${dto.TestId},
            EmployeeAppointmentId = ${dto.EmployeeAppointmentId}
            WHERE TestId = ${testEmployeeAppointment.TestId}
            AND EmployeeAppointmentId = ${testEmployeeAppointment.EmployeeAppointmentId}`
        ))[0] as TestEmployeeAppointment[];
    }

    async delete(testEmployeeAppointment: TestEmployeeAppointment): Promise<void>{
        return testEmployeeAppointment.destroy();
    }
}