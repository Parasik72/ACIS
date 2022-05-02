export interface ITestEmployeeAppointment {
    TestId: number;
    EmployeeAppointmentId: number;
}

export interface IUpdateTestEmployeeAppointment {
    TestId: number;
    EmployeeAppointmentId: number;
    BeforeTestId: number;
    BeforeEmployeeAppointmentId: number;
}

export const TestEmployeeAppointmentObj: ITestEmployeeAppointment = {
    EmployeeAppointmentId: 0,
    TestId: 0
}