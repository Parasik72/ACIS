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
import { ITestEquipment, TestEquipmentObj } from "./TestEquipment.type";
import { useTestEquipment } from "../../actions/test-equipment.action";

export const TestEquipment: FC = () => {
    const [TestId, setTestId] = useState<number>();
    const [EquipmentId, setEquipmentId] = useState<number>();
    const [BeforeTestId, setBeforeTestId] = useState<number>();
    const [BeforeEquipmentId, setBeforeEquipmentId] = useState<number>();
    const [popUpDisplayInsert, setPopUpDisplayInsert] = useState<boolean>(false);
    const [popUpDisplayUpdateDelete, setPopUpDisplayUpdateDelete] = useState<boolean>(false);
    const [findBy, setFindBy] = useState<string>('All');
    const [findValue, setFindValue] = useState<string>('');
    const options = ['All', ...(Object.keys(TestEquipmentObj))];
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getTestEquipments, createTestEquipment, updateTestEquipment, deleteTestEquipment} = useTestEquipment();
    useEffect(()=>{
        dispatch(getTestEquipments('', ''));
    },[dispatch, getTestEquipments]);
    const handleGetClick = () => {
        return dispatch(getTestEquipments(findBy, findValue));
    }
    const handleInsertClick = () => {
        setTestId(undefined);
        setEquipmentId(undefined);
        setPopUpDisplayInsert(true);
    };
    const handleCancelClick = () => {
        if(popUpDisplayInsert)
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete)
            setPopUpDisplayUpdateDelete(false);
    };
    const handleConfirmClick = async () => {
        if(!TestId || !EquipmentId)
            return alert('You need to fill in all the required fields in the form!');
        if(popUpDisplayInsert && await createTestEquipment({EquipmentId, TestId}))
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete && BeforeEquipmentId && BeforeTestId && await updateTestEquipment({BeforeEquipmentId, BeforeTestId, EquipmentId, TestId}))
            setPopUpDisplayUpdateDelete(false);
    };
    const handleClickTableItem = (data: Object) => {
        const item = data as ITestEquipment;
        setPopUpDisplayUpdateDelete(true);
        setTestId(item.TestId);
        setEquipmentId(item.EquipmentId);
        setBeforeTestId(item.TestId);
        setBeforeEquipmentId(item.EquipmentId);
    };
    const handleDeleteClick = async () => {
        if(EquipmentId && TestId && await deleteTestEquipment({EquipmentId, TestId}))
            setPopUpDisplayUpdateDelete(false);
    };
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>TEST EQUIPMENT FIND MENU</Title>
            <List>
                <ListSelect value={findBy} setValue={setFindBy} options={options}>Find by</ListSelect>
                <ListInput disabled={findBy === 'All'} value={findValue} setValue={setFindValue} placeholder={'Find value...'}>Find value</ListInput>
            </List>
        </Body>
        <Body>
            <Title>TEST EQUIPMENT MENU</Title>
            <List>
                <ListItem onClick={handleGetClick}>Get</ListItem>
                <ListItem onClick={handleInsertClick}>Insert</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>TEST EQUIPMENT TABLE</Title>
            <Table onClickItem={handleClickTableItem} data={data}/>
        </Body>
        {(popUpDisplayInsert || popUpDisplayUpdateDelete) && 
            <Popup setPopUpDisplay={popUpDisplayInsert ? setPopUpDisplayInsert : setPopUpDisplayUpdateDelete}>
                <Title>{popUpDisplayInsert ? 'TEST EQUIPMENT INSERT' : 'TEST EQUIPMENT UPDATE/DELETE'}</Title>
                <List>
                    <ListInput value={String(TestId)} setValue={setTestId} placeholder={'TestId...'}>TestId*</ListInput>
                    <ListInput value={String(EquipmentId)} setValue={setEquipmentId} placeholder={'EquipmentId...'}>EquipmentId*</ListInput>
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