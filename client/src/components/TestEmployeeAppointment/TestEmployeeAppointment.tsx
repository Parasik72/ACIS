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
import { ITestEmployeeAppointment, TestEmployeeAppointmentObj } from "./TestEmployeeAppointment.type";
import { useTestEmployeeAppointment } from "../../actions/test-employee-appointment.action";

export const TestEmployeeAppointment: FC = () => {
    const [TestId, setTestId] = useState<number>();
    const [EmployeeAppointmentId, setEmployeeAppointmentId] = useState<number>();
    const [BeforeTestId, setBeforeTestId] = useState<number>();
    const [BeforeEmployeeAppointmentId, setBeforeEmployeeAppointmentId] = useState<number>();
    const [popUpDisplayInsert, setPopUpDisplayInsert] = useState<boolean>(false);
    const [popUpDisplayUpdateDelete, setPopUpDisplayUpdateDelete] = useState<boolean>(false);
    const [findBy, setFindBy] = useState<string>('All');
    const [findValue, setFindValue] = useState<string>('');
    const options = ['All', ...(Object.keys(TestEmployeeAppointmentObj))];
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getTestEmployeeAppointments, createTestEmployeeAppointment, 
           updateTestEmployeeAppointment, deleteTestEmployeeAppointment} = useTestEmployeeAppointment();
    useEffect(()=>{
        dispatch(getTestEmployeeAppointments('', ''));
    },[dispatch, getTestEmployeeAppointments]);
    const handleGetClick = () => {
        return dispatch(getTestEmployeeAppointments(findBy, findValue));
    }
    const handleInsertClick = () => {
        setTestId(undefined);
        setEmployeeAppointmentId(undefined);
        setPopUpDisplayInsert(true);
    };
    const handleCancelClick = () => {
        if(popUpDisplayInsert)
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete)
            setPopUpDisplayUpdateDelete(false);
    };
    const handleConfirmClick = async () => {
        if(!TestId || !EmployeeAppointmentId)
            return alert('You need to fill in all the required fields in the form!');
        if(popUpDisplayInsert && await createTestEmployeeAppointment({EmployeeAppointmentId, TestId}))
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete && BeforeEmployeeAppointmentId && BeforeTestId && await updateTestEmployeeAppointment({EmployeeAppointmentId, TestId, BeforeEmployeeAppointmentId, BeforeTestId}))
            setPopUpDisplayUpdateDelete(false);
    };
    const handleClickTableItem = (data: Object) => {
        const item = data as ITestEmployeeAppointment;
        setPopUpDisplayUpdateDelete(true);
        setTestId(item.TestId);
        setEmployeeAppointmentId(item.EmployeeAppointmentId);
        setBeforeTestId(item.TestId);
        setBeforeEmployeeAppointmentId(item.EmployeeAppointmentId);
    };
    const handleDeleteClick = async () => {
        if(TestId && EmployeeAppointmentId && await deleteTestEmployeeAppointment({EmployeeAppointmentId, TestId}))
            setPopUpDisplayUpdateDelete(false);
    };
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>TEST EMPLOYEE APPOINTMENT FIND MENU</Title>
            <List>
                <ListSelect value={findBy} setValue={setFindBy} options={options}>Find by</ListSelect>
                <ListInput disabled={findBy === 'All'} value={findValue} setValue={setFindValue} placeholder={'Find value...'}>Find value</ListInput>
            </List>
        </Body>
        <Body>
            <Title>TEST EMPLOYEE APPOINTMENT MENU</Title>
            <List>
                <ListItem onClick={handleGetClick}>Get</ListItem>
                <ListItem onClick={handleInsertClick}>Insert</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>TEST EMPLOYEE APPOINTMENT TABLE</Title>
            <Table onClickItem={handleClickTableItem} data={data}/>
        </Body>
        {(popUpDisplayInsert || popUpDisplayUpdateDelete) && 
            <Popup setPopUpDisplay={popUpDisplayInsert ? setPopUpDisplayInsert : setPopUpDisplayUpdateDelete}>
                <Title>{popUpDisplayInsert ? 'TEST EMPLOYEE APPOINTMENT INSERT' : 'TEST EMPLOYEE APPOINTMENT UPDATE/DELETE'}</Title>
                <List>
                    <ListInput value={String(TestId)} setValue={setTestId} placeholder={'TestId...'}>TestId*</ListInput>
                    <ListInput value={String(EmployeeAppointmentId)} setValue={setEmployeeAppointmentId} placeholder={'EmployeeAppointmentId...'}>EmployeeAppointmentId*</ListInput>
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