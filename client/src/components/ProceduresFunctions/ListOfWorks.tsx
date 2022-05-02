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

export const ListOfWorks: FC = () => {
    const [productName, setProductName] = useState<string>('Gimlet');
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getListOfWorks} = useProceduresFunctions();
    useEffect(()=>{
        dispatch(getListOfWorks({ProductName: 'Gimlet'}));
    },[dispatch, getListOfWorks]);
    const handleGetClick = () => {
        dispatch(getListOfWorks({ProductName: productName}));
    }
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>LIST OF WORKS MENU</Title>
            <List>
                <ListInput value={String(productName)} setValue={setProductName} placeholder="Enter the product name...">Employee product name</ListInput>
                <ListItem onClick={handleGetClick}>Get</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>LIST OF WORKS TABLE</Title>
            <Table data={data}/>
        </Body>
        </>
    );
};