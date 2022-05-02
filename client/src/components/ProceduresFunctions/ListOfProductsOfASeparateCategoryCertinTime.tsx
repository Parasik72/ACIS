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

export const ListOfProductsOfASeparateCategoryCertinTime: FC = () => {
    const [companyId, setCompanyId] = useState<number>(1);
    const [manufactoryId, setManufactoryId] = useState<number>(1);
    const [areadId, setAreaId] = useState<number>(1);
    const [dateFrom, setDateFrom] = useState<Date>(new Date('2002-01-01'));
    const [dateTo, setDateTo] = useState<Date>(new Date('2022-01-01'));
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getListOfProductsOfASeparateCategoryCertinTime} = useProceduresFunctions();
    const formatYmd = (date: Date) => date.toISOString().slice(0, 10);
    useEffect(()=>{
        dispatch(getListOfProductsOfASeparateCategoryCertinTime({CompanyId: 1, ManufactoryId: 1, AreaId: 1, DateFrom: '2002-01-01', DateTo: '2022-01-01'}));
    },[dispatch, getListOfProductsOfASeparateCategoryCertinTime]);
    const handleGetClick = () => {
        if(isNaN(companyId) || isNaN(manufactoryId) || isNaN(areadId))
            return;
        dispatch(getListOfProductsOfASeparateCategoryCertinTime({
            CompanyId: companyId, 
            ManufactoryId: manufactoryId, 
            AreaId: areadId, 
            DateFrom: formatYmd(dateFrom), 
            DateTo: formatYmd(dateTo)
        }));
    }
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>LIST OF PRODUCTS OF A SEPARATE CATEGORY CERTAIN TIME MENU</Title>
            <List>
                <ListInput value={String(companyId)} setValue={setCompanyId} placeholder="Enter the company id...">Company id</ListInput>
                <ListInput value={String(manufactoryId)} setValue={setManufactoryId} placeholder="Enter the manufactory id...">Manufactory id</ListInput>
                <ListInput value={String(areadId)} setValue={setAreaId} placeholder="Enter the area id...">Area id</ListInput>
                <ListDateItem value={formatYmd(dateFrom)} setValue={setDateFrom}>Date from</ListDateItem>
                <ListDateItem value={formatYmd(dateTo)} setValue={setDateTo}>Date to</ListDateItem>
                <ListItem onClick={handleGetClick}>Get</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>LIST OF PRODUCTS OF A SEPARATE CATEGORY CERTAIN TIME TABLE</Title>
            <Table data={data}/>
        </Body>
        </>
    );
};