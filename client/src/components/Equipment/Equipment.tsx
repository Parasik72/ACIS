import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useEquipment } from "../../actions/equipment.action";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Body } from "../Main/Body/Body";
import { List } from "../Main/List/List";
import { ListBtns } from "../Main/List/ListBtns/ListBtns";
import { ListInput } from "../Main/List/ListInput/ListInput";
import { ListItem } from "../Main/List/ListItem/ListItem";
import { ListSelect } from "../Main/List/ListSelect/ListSelect";
import { Loader } from "../Main/Loader/Loader";
import { Popup } from "../Main/Popup/Popup";
import { Table } from "../Main/Table/Table";
import { Title } from "../Main/Title/Title";
import { EquipmentObj, IEquipment } from "./Equipment.type";

export const Equipment: FC = () => {
    const [id, setId] = useState<number>();
    const [Type, setType] = useState<string>('');
    const [popUpDisplayInsert, setPopUpDisplayInsert] = useState<boolean>(false);
    const [popUpDisplayUpdateDelete, setPopUpDisplayUpdateDelete] = useState<boolean>(false);
    const [findBy, setFindBy] = useState<string>('All');
    const [findValue, setFindValue] = useState<string>('');
    const options = ['All', ...(Object.keys(EquipmentObj))];
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getEquipments, createEquipment, updateEquipment, deleteEquipment} = useEquipment();
    useEffect(()=>{
        dispatch(getEquipments('', ''));
    },[dispatch, getEquipments]);
    const handleGetClick = () => {
        return dispatch(getEquipments(findBy, findValue));
    }
    const handleInsertClick = () => {
        setId(undefined);
        setType('');
        setPopUpDisplayInsert(true);
    };
    const handleCancelClick = () => {
        if(popUpDisplayInsert)
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete)
            setPopUpDisplayUpdateDelete(false);
    };
    const handleConfirmClick = async () => {
        if(!id || !Type)
            return alert('You need to fill in all the required fields in the form!');
        if(popUpDisplayInsert && await createEquipment({id, Type}))
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete && await updateEquipment({id, Type}))
            setPopUpDisplayUpdateDelete(false);
    };
    const handleClickTableItem = (data: Object) => {
        const item = data as IEquipment;
        setPopUpDisplayUpdateDelete(true);
        setId(item.id);
        setType(item.Type);
    };
    const handleDeleteClick = async () => {
        if(id && await deleteEquipment({id}))
            setPopUpDisplayUpdateDelete(false);
    };
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>EQUIPMENT FIND MENU</Title>
            <List>
                <ListSelect value={findBy} setValue={setFindBy} options={options}>Find by</ListSelect>
                <ListInput disabled={findBy === 'All'} value={findValue} setValue={setFindValue} placeholder={'Find value...'}>Find value</ListInput>
            </List>
        </Body>
        <Body>
            <Title>EQUIPMENT MENU</Title>
            <List>
                <ListItem onClick={handleGetClick}>Get</ListItem>
                <ListItem onClick={handleInsertClick}>Insert</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>EQUIPMENT TABLE</Title>
            <Table onClickItem={handleClickTableItem} data={data}/>
        </Body>
        {(popUpDisplayInsert || popUpDisplayUpdateDelete) && 
            <Popup setPopUpDisplay={popUpDisplayInsert ? setPopUpDisplayInsert : setPopUpDisplayUpdateDelete}>
                <Title>{popUpDisplayInsert ? 'EQUIPMENT INSERT' : 'EQUIPMENT UPDATE/DELETE'}</Title>
                <List>
                    <ListInput disabled={popUpDisplayUpdateDelete} value={String(id)} setValue={setId} placeholder={'Id...'}>Id*</ListInput>
                    <ListInput value={Type} setValue={setType} placeholder={'Type...'}>Type*</ListInput>
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