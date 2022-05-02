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
import { IPositionAttribute, PositionAttributeObj } from "./PositionAttribute.type";
import { usePositionAttribute } from "../../actions/position-attribute.action";

export const PositionAttribute: FC = () => {
    const [PositionId, setPositionId] = useState<number>();
    const [AttributeId, setAttributeId] = useState<number>();
    const [BeforePositionId, setBeforePositionId] = useState<number>();
    const [BeforeAttributeId, setBeforeAttributeId] = useState<number>();
    const [popUpDisplayInsert, setPopUpDisplayInsert] = useState<boolean>(false);
    const [popUpDisplayUpdateDelete, setPopUpDisplayUpdateDelete] = useState<boolean>(false);
    const [findBy, setFindBy] = useState<string>('All');
    const [findValue, setFindValue] = useState<string>('');
    const options = ['All', ...(Object.keys(PositionAttributeObj))];
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getPositionAttributes, createPositionAttribute, 
           updatePositionAttribute, deletePositionAttribute} = usePositionAttribute();
    useEffect(()=>{
        dispatch(getPositionAttributes('', ''));
    },[dispatch, getPositionAttributes]);
    const handleGetClick = () => {
        return dispatch(getPositionAttributes(findBy, findValue));
    }
    const handleInsertClick = () => {
        setPositionId(undefined);
        setAttributeId(undefined);
        setPopUpDisplayInsert(true);
    };
    const handleCancelClick = () => {
        if(popUpDisplayInsert)
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete)
            setPopUpDisplayUpdateDelete(false);
    };
    const handleConfirmClick = async () => {
        if(!PositionId || !AttributeId)
            return alert('You need to fill in all the required fields in the form!');
        if(popUpDisplayInsert && await createPositionAttribute({PositionId, AttributeId}))
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete && BeforeAttributeId && BeforePositionId && await updatePositionAttribute({BeforeAttributeId, BeforePositionId, AttributeId, PositionId}))
            setPopUpDisplayUpdateDelete(false);
    };
    const handleClickTableItem = (data: Object) => {
        const item = data as IPositionAttribute;
        setPopUpDisplayUpdateDelete(true);
        setPositionId(item.PositionId);
        setAttributeId(item.AttributeId);
        setBeforePositionId(item.PositionId);
        setBeforeAttributeId(item.AttributeId);
    };
    const handleDeleteClick = async () => {
        if(PositionId && AttributeId && await deletePositionAttribute({PositionId, AttributeId}))
            setPopUpDisplayUpdateDelete(false);
    };
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>POSITION ATTRIBUTE FIND MENU</Title>
            <List>
                <ListSelect value={findBy} setValue={setFindBy} options={options}>Find by</ListSelect>
                <ListInput disabled={findBy === 'All'} value={findValue} setValue={setFindValue} placeholder={'Find value...'}>Find value</ListInput>
            </List>
        </Body>
        <Body>
            <Title>POSITION ATTRIBUTE MENU</Title>
            <List>
                <ListItem onClick={handleGetClick}>Get</ListItem>
                <ListItem onClick={handleInsertClick}>Insert</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>POSITION ATTRIBUTE TABLE</Title>
            <Table onClickItem={handleClickTableItem} data={data}/>
        </Body>
        {(popUpDisplayInsert || popUpDisplayUpdateDelete) && 
            <Popup setPopUpDisplay={popUpDisplayInsert ? setPopUpDisplayInsert : setPopUpDisplayUpdateDelete}>
                <Title>{popUpDisplayInsert ? 'POSITION ATTRIBUTE INSERT' : 'POSITION ATTRIBUTE UPDATE/DELETE'}</Title>
                <List>
                    <ListInput value={String(PositionId)} setValue={setPositionId} placeholder={'PositionId...'}>PositionId*</ListInput>
                    <ListInput value={String(AttributeId)} setValue={setAttributeId} placeholder={'AttributeId...'}>AttributeId*</ListInput>
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