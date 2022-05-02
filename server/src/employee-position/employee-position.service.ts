import { Op } from "sequelize";
import { Service } from "typedi";
import { CreateEmployeePositionDto } from "./dto/create-employee-position.dto";
import { UpdateEmployeePositionDto } from "./dto/update-employee-position.dto";
import { EmployeePosition } from "./employee-position.model";

const emptyEmployeePosition: CreateEmployeePositionDto = {
    id: 0,
    PositionName: ''
}

@Service()
export class EmployeePositionService {
    async getAllEmployeePositions(limit: string, findBy?: string, findValue?: string): Promise<EmployeePosition[]> {
        if(!findBy || !findValue || !Object.keys(emptyEmployeePosition).includes(findBy))
            return await EmployeePosition.findAll({limit: Number(limit)});
        return await EmployeePosition.findAll({limit: Number(limit), where: {
            [findBy]: {
                [Op.like]: `%${findValue}%`
            }
        }});
    }

    async findById(id: number): Promise<EmployeePosition | null> {
        const person = await EmployeePosition.findOne({where:{id}})
        return person
    }

    async create(dto: CreateEmployeePositionDto): Promise<EmployeePosition> {
        return EmployeePosition.create(dto);
    }

    async update(employeePosition: EmployeePosition, dto: UpdateEmployeePositionDto): Promise<EmployeePosition>{
        return employeePosition.update(dto);
    }

    async delete(employeePosition: EmployeePosition): Promise<void>{
        return employeePosition.destroy();
    }
}