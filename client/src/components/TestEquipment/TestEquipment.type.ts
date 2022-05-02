export interface ITestEquipment {
    TestId: number;
    EquipmentId: number;
}

export interface IUpdateTestEquipment {
    TestId: number;
    EquipmentId: number;
    BeforeTestId: number;
    BeforeEquipmentId: number;
}

export const TestEquipmentObj: ITestEquipment = {
    EquipmentId: 0,
    TestId: 0
}