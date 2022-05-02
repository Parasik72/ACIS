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

export const ListOfProductsOfASeparateCategoryTestingInPolygons: FC = () => {
    const [polygonId, setPolygonId] = useState<number>(2);
    const [dateFrom, setDateFrom] = useState<Date>(new Date('2002-01-01'));
    const [dateTo, setDateTo] = useState<Date>(new Date('2022-01-01'));
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getListOfProductsOfASeparateCategoryTestingInPolygons} = useProceduresFunctions();
    const formatYmd = (date: Date) => date.toISOString().slice(0, 10);
    useEffect(()=>{
        dispatch(getListOfProductsOfASeparateCategoryTestingInPolygons({PolygonId: 2, DateFrom: '2002-01-01', DateTo: '2022-01-01'}));
    },[dispatch, getListOfProductsOfASeparateCategoryTestingInPolygons]);
    const handleGetClick = () => {
        if(isNaN(polygonId))
            return;
        dispatch(getListOfProductsOfASeparateCategoryTestingInPolygons({
            PolygonId: polygonId, 
            DateFrom: formatYmd(dateFrom), 
            DateTo: formatYmd(dateTo)
        }));
    }
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>LIST OF PRODUCTS OF A SEPARATE CATEGORY TESTING IN POLYGONS MENU</Title>
            <List>
                <ListInput value={String(polygonId)} setValue={setPolygonId} placeholder="Enter the polygon id...">Polygon id</ListInput>
                <ListDateItem value={formatYmd(dateFrom)} setValue={setDateFrom}>Date from</ListDateItem>
                <ListDateItem value={formatYmd(dateTo)} setValue={setDateTo}>Date to</ListDateItem>
                <ListItem onClick={handleGetClick}>Get</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>LIST OF PRODUCTS OF A SEPARATE CATEGORY TESTING IN POLYGONS TABLE</Title>
            <Table data={data}/>
        </Body>
        </>
    );
};