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

export const ListOfAreasQuantity: FC = () => {
    const [companyId, setCompanyId] = useState<number>(1);
    const [manufactoryId, setManufactoryId] = useState<number>(1);
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getListOfAreasQuantity} = useProceduresFunctions();
    useEffect(()=>{
        dispatch(getListOfAreasQuantity({CompanyId: 1, ManufactoryId: 1}));
    },[dispatch, getListOfAreasQuantity]);
    const handleGetClick = () => {
        if(isNaN(companyId) || isNaN(manufactoryId))
            return;
        dispatch(getListOfAreasQuantity({CompanyId: companyId, ManufactoryId: manufactoryId}));
    }
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>LIST OF PRODUCTS OF AREAS QUANTITY MENU</Title>
            <List>
                <ListInput value={String(companyId)} setValue={setCompanyId} placeholder="Enter the company id...">Company id</ListInput>
                <ListInput value={String(manufactoryId)} setValue={setManufactoryId} placeholder="Enter the manufactory id...">Manufactory id</ListInput>
                <ListItem onClick={handleGetClick}>Get</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>LIST OF PRODUCTS OF AREAS QUANTITY TABLE</Title>
            <Table data={data}/>
        </Body>
        </>
    );
};