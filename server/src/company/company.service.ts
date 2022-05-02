import { Op } from "sequelize";
import { Service } from "typedi";
import { Company } from "./company.model";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

const emptyComapny: CreateCompanyDto = {
    id: 0,
    Name: ''
}

@Service()
export class CompanyService {
    async getAllCompanies(limit: string, findBy?: string, findValue?: string): Promise<Company[]> {
        if(!findBy || !findValue || !Object.keys(emptyComapny).includes(findBy))
            return await Company.findAll({limit: Number(limit)});
        return await Company.findAll({limit: Number(limit), where: {
            [findBy]: {
                [Op.like]: `%${findValue}%`
            }
        }});
    }

    async findById(id: number): Promise<Company | null> {
        const company = await Company.findOne({where:{id}})
        return company;
    }

    async create(dto: CreateCompanyDto): Promise<Company> {
        return Company.create(dto);
    }

    async update(company: Company, dto: UpdateCompanyDto): Promise<Company>{
        return company.update(dto);
    }

    async delete(company: Company): Promise<void>{
        return company.destroy();
    }
}