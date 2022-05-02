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

export const ListOfPolygonsTestingProduct: FC = () => {
    const [productId, setProductId] = useState<number>(1);
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getListOfPolygonsTestingProduct} = useProceduresFunctions();
    useEffect(()=>{
        dispatch(getListOfPolygonsTestingProduct({ProductId: 1}));
    },[dispatch, getListOfPolygonsTestingProduct]);
    const handleGetClick = () => {
        if(isNaN(productId))
            return;
        dispatch(getListOfPolygonsTestingProduct({ProductId: productId}));
    }
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>LIST OF POLYGONS TESTING PRODUCT MENU</Title>
            <List>
                <ListInput value={String(productId)} setValue={setProductId} placeholder="Enter the product id...">Employee product id</ListInput>
                <ListItem onClick={handleGetClick}>Get</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>LIST OF POLYGONS TESTING PRODUCT TABLE</Title>
            <Table data={data}/>
        </Body>
        </>
    );
};