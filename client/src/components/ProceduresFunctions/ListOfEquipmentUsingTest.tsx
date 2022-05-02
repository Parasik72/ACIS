import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useProceduresFunctions } from "../../actions/procedures-functions.action";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Body } from "../Main/Body/Body";
import { List } from "../Main/List/List";
import { ListDateItem } from "../Main/List/ListDateItem/ListDateItem";
import { ListInput } from "../Main/List/ListInput/ListInput";
import { ListItem } from "../Main/List/ListItem/ListItem";
import { Loader } from "../Main/Loader/Loader";
import { Table } from "../Main/Table/Table";
import { Title } from "../Main/Title/Title";

export const ListOfEquipmentUsingTest: FC = () => {
    const [productName, setProductName] = useState<string>('Boeing / Sikorsky RAH-66 Comanche');
    const [dateFrom, setDateFrom] = useState<Date>(new Date('2002-01-01'));
    const [dateTo, setDateTo] = useState<Date>(new Date('2022-01-01'));
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getListOfEquipmentUsingTest} = useProceduresFunctions();
    const formatYmd = (date: Date) => date.toISOString().slice(0, 10);
    useEffect(()=>{
        dispatch(getListOfEquipmentUsingTest({ProductName: 'Boeing / Sikorsky RAH-66 Comanche', DateFrom: '2002-01-01', DateTo: '2022-01-01'}));
    },[dispatch, getListOfEquipmentUsingTest]);
    const handleGetClick = () => {
        dispatch(getListOfEquipmentUsingTest({
            ProductName: productName, 
            DateFrom: formatYmd(dateFrom), 
            DateTo: formatYmd(dateTo)
        }));
    }
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>LIST OF EQUIPMENT USING TEST MENU</Title>
            <List>
                <ListInput value={String(productName)} setValue={setProductName} placeholder="Enter the product name...">Product name</ListInput>
                <ListDateItem value={formatYmd(dateFrom)} setValue={setDateFrom}>Date from</ListDateItem>
                <ListDateItem value={formatYmd(dateTo)} setValue={setDateTo}>Date to</ListDateItem>
                <ListItem onClick={handleGetClick}>Get</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>LIST OF EQUIPMENT USING TEST TABLE</Title>
            <Table data={data}/>
        </Body>
        </>
    );
};