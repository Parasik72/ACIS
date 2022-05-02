export interface IEmployeeAppointment {
    id: number;
    PersonId: number;
    EmployeePositionId: number;
    AreaId: number | null;
    BrigadeId: number | null;
    AppointmentDate: string;
    DismissalDate: string | null;
}

export interface IDeleteEmployeeAppointment {
    id: number;
}

export const EmployeeAppointmentObj: IEmployeeAppointment = {
    id: 0,
    PersonId: 0,
    EmployeePositionId: 0,
    AreaId: 0,
    BrigadeId: 0,
    AppointmentDate: '',
    DismissalDate: ''
}