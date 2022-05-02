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

export const BrigadeCompositions: FC = () => {
    const [manufactoryId, setManufactoryId] = useState<number>(1);
    const [areaId, setAreaId] = useState<number>(1);
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getBrigadeCompositions} = useProceduresFunctions();
    useEffect(()=>{
        dispatch(getBrigadeCompositions({ManufactoryId: 1, AreaId: 1}));
    },[dispatch, getBrigadeCompositions]);
    const handleGetClick = () => {
        if(isNaN(manufactoryId) || isNaN(areaId))
            return;
        dispatch(getBrigadeCompositions({ManufactoryId: manufactoryId, AreaId: areaId}));
    }
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>BRIGADE COMPOSITIONS MENU</Title>
            <List>
                <ListInput value={String(manufactoryId)} setValue={setManufactoryId} placeholder="Enter the manufactory id...">Manufactory id</ListInput>
                <ListInput value={String(areaId)} setValue={setAreaId} placeholder="Enter the area id...">Area id</ListInput>
                <ListItem onClick={handleGetClick}>Get</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>BRIGADE COMPOSITIONS TABLE</Title>
            <Table data={data}/>
        </Body>
        </>
    );
};