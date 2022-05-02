declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: number;
        MSSQL_DATABASE: string;
        MSSQL_USERNAME: string;
        MSSQL_PASSWORD: string;
        MSSQL_HOST: string;
    } 
}