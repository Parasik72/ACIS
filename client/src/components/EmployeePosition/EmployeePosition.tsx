import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useEmployeePosition } from "../../actions/employee-position.action";
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
import { EmployeePositionObj, IEmployeePosition } from "./EmployeePosition.type";

export const EmployeePosition: FC = () => {
    const [id, setId] = useState<number>();
    const [PositionName, setPositionName] = useState<string>('');
    const [popUpDisplayInsert, setPopUpDisplayInsert] = useState<boolean>(false);
    const [popUpDisplayUpdateDelete, setPopUpDisplayUpdateDelete] = useState<boolean>(false);
    const [findBy, setFindBy] = useState<string>('All');
    const [findValue, setFindValue] = useState<string>('');
    const options = ['All', ...(Object.keys(EmployeePositionObj))];
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getEmployeePositions, createEmployeePosition, 
           updateEmployeePosition, deleteEmployeePosition} = useEmployeePosition();
    useEffect(()=>{
        dispatch(getEmployeePositions('', ''));
    },[dispatch, getEmployeePositions]);
    const handleGetClick = () => {
        return dispatch(getEmployeePositions(findBy, findValue));
    }
    const handleInsertClick = () => {
        setId(undefined);
        setPositionName('');
        setPopUpDisplayInsert(true);
    };
    const handleCancelClick = () => {
        if(popUpDisplayInsert)
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete)
            setPopUpDisplayUpdateDelete(false);
    };
    const handleConfirmClick = async () => {
        if(!id || !PositionName)
            return alert('You need to fill in all the required fields in the form!');
        if(popUpDisplayInsert && await createEmployeePosition({id, PositionName}))
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete && await updateEmployeePosition({id, PositionName}))
            setPopUpDisplayUpdateDelete(false);
    };
    const handleClickTableItem = (data: Object) => {
        const item = data as IEmployeePosition;
        setPopUpDisplayUpdateDelete(true);
        setId(item.id);
        setPositionName(item.PositionName);
    };
    const handleDeleteClick = async () => {
        if(id && await deleteEmployeePosition({id}))
            setPopUpDisplayUpdateDelete(false);
    };
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>EMPLOYEE POSITION FIND MENU</Title>
            <List>
                <ListSelect value={findBy} setValue={setFindBy} options={options}>Find by</ListSelect>
                <ListInput disabled={findBy === 'All'} value={findValue} setValue={setFindValue} placeholder={'Find value...'}>Find value</ListInput>
            </List>
        </Body>
        <Body>
            <Title>EMPLOYEE POSITION MENU</Title>
            <List>
                <ListItem onClick={handleGetClick}>Get</ListItem>
                <ListItem onClick={handleInsertClick}>Insert</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>EMPLOYEE POSITION TABLE</Title>
            <Table onClickItem={handleClickTableItem} data={data}/>
        </Body>
        {(popUpDisplayInsert || popUpDisplayUpdateDelete) && 
            <Popup setPopUpDisplay={popUpDisplayInsert ? setPopUpDisplayInsert : setPopUpDisplayUpdateDelete}>
                <Title>{popUpDisplayInsert ? 'EMPLOYEE POSITION INSERT' : 'EMPLOYEE POSITION UPDATE/DELETE'}</Title>
                <List>
                    <ListInput disabled={popUpDisplayUpdateDelete} value={String(id)} setValue={setId} placeholder={'Id...'}>Id*</ListInput>
                    <ListInput value={PositionName} setValue={setPositionName} placeholder={'PositionName...'}>PositionName*</ListInput>
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