export interface IPerson {
    id: number;
    Firstname: string;
    Lastname: string;
    Birthday: string;
}

export interface IDeletePerson {
    id: number;
}

export const PersonObj: IPerson = {
    id: 0,
    Firstname: '',
    Lastname: '',
    Birthday: ''
}