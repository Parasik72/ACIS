import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Body } from "../Main/Body/Body";
import { List } from "../Main/List/List";
import { ListInput } from "../Main/List/ListInput/ListInput";
import { ListItem } from "../Main/List/ListItem/ListItem";
import { ListSelect } from "../Main/List/ListSelect/ListSelect";
import { Loader } from "../Main/Loader/Loader";
import { Table } from "../Main/Table/Table";
import { Title } from "../Main/Title/Title";
import { Popup } from "../Main/Popup/Popup";
import { ListBtns } from "../Main/List/ListBtns/ListBtns";
import { IManufactoryPolygon, ManufactoryPolygonObj } from "./ManufactoryPolygon.type";
import { useManufactoryPolygon } from "../../actions/manufactory-polygon.action";

export const ManufactoryPolygon: FC = () => {
    const [ManufactoryId, setManufactoryId] = useState<number>();
    const [PolygonId, setPolygonId] = useState<number>();
    const [BeforeManufactoryId, setBeforeManufactoryId] = useState<number>();
    const [BeforePolygonId, setBeforePolygonId] = useState<number>();
    const [popUpDisplayInsert, setPopUpDisplayInsert] = useState<boolean>(false);
    const [popUpDisplayUpdateDelete, setPopUpDisplayUpdateDelete] = useState<boolean>(false);
    const [findBy, setFindBy] = useState<string>('All');
    const [findValue, setFindValue] = useState<string>('');
    const options = ['All', ...(Object.keys(ManufactoryPolygonObj))];
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getManufactoryPolygons, createManufactoryPolygon, 
           updateManufactoryPolygon, deleteManufactoryPolygon} = useManufactoryPolygon();
    useEffect(()=>{
        dispatch(getManufactoryPolygons('', ''));
    },[dispatch, getManufactoryPolygons]);
    const handleGetClick = () => {
        return dispatch(getManufactoryPolygons(findBy, findValue));
    }
    const handleInsertClick = () => {
        setManufactoryId(undefined);
        setPolygonId(undefined);
        setPopUpDisplayInsert(true);
    };
    const handleCancelClick = () => {
        if(popUpDisplayInsert)
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete)
            setPopUpDisplayUpdateDelete(false);
    };
    const handleConfirmClick = async () => {
        if(!ManufactoryId || !PolygonId)
            return alert('You need to fill in all the required fields in the form!');
        if(popUpDisplayInsert && await createManufactoryPolygon({ManufactoryId, PolygonId}))
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete && BeforeManufactoryId && BeforePolygonId && await updateManufactoryPolygon({BeforeManufactoryId, BeforePolygonId, ManufactoryId, PolygonId}))
            setPopUpDisplayUpdateDelete(false);
    };
    const handleClickTableItem = (data: Object) => {
        const item = data as IManufactoryPolygon;
        setPopUpDisplayUpdateDelete(true);
        setManufactoryId(item.ManufactoryId);
        setPolygonId(item.PolygonId);
        setBeforeManufactoryId(item.ManufactoryId);
        setBeforePolygonId(item.PolygonId);
    };
    const handleDeleteClick = async () => {
        if(ManufactoryId && PolygonId && await deleteManufactoryPolygon({ManufactoryId, PolygonId}))
            setPopUpDisplayUpdateDelete(false);
    };
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>MANUFACTORY POLYGON FIND MENU</Title>
            <List>
                <ListSelect value={findBy} setValue={setFindBy} options={options}>Find by</ListSelect>
                <ListInput disabled={findBy === 'All'} value={findValue} setValue={setFindValue} placeholder={'Find value...'}>Find value</ListInput>
            </List>
        </Body>
        <Body>
            <Title>MANUFACTORY POLYGON MENU</Title>
            <List>
                <ListItem onClick={handleGetClick}>Get</ListItem>
                <ListItem onClick={handleInsertClick}>Insert</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>MANUFACTORY POLYGON TABLE</Title>
            <Table onClickItem={handleClickTableItem} data={data}/>
        </Body>
        {(popUpDisplayInsert || popUpDisplayUpdateDelete) && 
            <Popup setPopUpDisplay={popUpDisplayInsert ? setPopUpDisplayInsert : setPopUpDisplayUpdateDelete}>
                <Title>{popUpDisplayInsert ? 'MANUFACTORY POLYGON INSERT' : 'MANUFACTORY POLYGON UPDATE/DELETE'}</Title>
                <List>
                    <ListInput value={String(ManufactoryId)} setValue={setManufactoryId} placeholder={'ManufactoryId...'}>ManufactoryId*</ListInput>
                    <ListInput value={String(PolygonId)} setValue={setPolygonId} placeholder={'PolygonId...'}>PolygonId*</ListInput>
                    <ListBtns width={popUpDisplayUpdateDelete ? '100%' : ''}>
                        <ListItem onClick={handleConfirmClick}>{popUpDisplayUpdateDelete ? 'Update' : 'Insert'}</ListItem>
                        {popUpDisplayUpdateDelete && <ListItem onClick={handleDeleteClick}>Delete</ListItem>}
                        <ListItem onClick={handleCancelClick}>Cancel</ListItem>
                    </ListBtns>
                </List>
            </Popup>
        }
        </>
    );
};