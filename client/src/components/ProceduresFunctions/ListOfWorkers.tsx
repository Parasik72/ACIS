import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useProceduresFunctions } from "../../actions/procedures-functions.action";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Body } from "../Main/Body/Body";
import { List } from "../Main/List/List";
import { ListInput } from "../Main/List/ListInput/ListInput";
import { ListItem } from "../Main/List/ListItem/ListItem";
import { Loader } from "../Main/Loader/Loader";
import { Table } from "../Main/Table/Table";
import { Title } from "../Main/Title/Title";

export const ListOfWorkers: FC = () => {
    const [employeePositionId, setEmployeePositionId] = useState<number>(2);
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getListOfWorkers} = useProceduresFunctions();
    useEffect(()=>{
        dispatch(getListOfWorkers({EmployeePositionId: 2}));
    },[dispatch, getListOfWorkers]);
    const handleGetClick = () => {
        if(isNaN(employeePositionId))
            return;
        dispatch(getListOfWorkers({EmployeePositionId: employeePositionId}));
    }
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>LIST OF WORKERS MENU</Title>
            <List>
                <ListInput value={String(employeePositionId)} setValue={setEmployeePositionId} placeholder="Enter the employee position id...">Employee position id</ListInput>
                <ListItem onClick={handleGetClick}>Get</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>LIST OF WORKERS TABLE</Title>
            <Table data={data}/>
        </Body>
        </>
    );
};