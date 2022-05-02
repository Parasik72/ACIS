import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useEmployeeAppointment } from "../../actions/employee-appointment.action";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Body } from "../Main/Body/Body";
import { List } from "../Main/List/List";
import { ListBtns } from "../Main/List/ListBtns/ListBtns";
import { ListDateItem } from "../Main/List/ListDateItem/ListDateItem";
import { ListInput } from "../Main/List/ListInput/ListInput";
import { ListItem } from "../Main/List/ListItem/ListItem";
import { ListSelect } from "../Main/List/ListSelect/ListSelect";
import { Loader } from "../Main/Loader/Loader";
import { Popup } from "../Main/Popup/Popup";
import { Table } from "../Main/Table/Table";
import { Title } from "../Main/Title/Title";
import { EmployeeAppointmentObj, IEmployeeAppointment } from "./EmployeeAppointment.type";

export const EmployeeAppointment: FC = () => {
    const [id, setId] = useState<number>();
    const [PersonId, setPersonId] = useState<number>();
    const [EmployeePositionId, setEmployeePositionId] = useState<number>();
    const [AreaId, setAreaId] = useState<number>();
    const [AreaIdIsNull, setAreaIdIsNull] = useState<boolean>();
    const [BrigadeId, setBrigadeId] = useState<number>();
    const [BrigadeIdIsNull, setBrigadeIdIsNull] = useState<boolean>();
    const [AppointmentDate, setAppointmentDate] = useState<Date>(new Date());
    const [DismissalDate, setDismissalDate] = useState<Date>(new Date());
    const [DismissalDateIsNull, setDismissalDateIsNull] = useState<boolean>(false);
    const [popUpDisplayInsert, setPopUpDisplayInsert] = useState<boolean>(false);
    const [popUpDisplayUpdateDelete, setPopUpDisplayUpdateDelete] = useState<boolean>(false);
    const [findBy, setFindBy] = useState<string>('All');
    const [findValue, setFindValue] = useState<string>('');
    const [findValueDate, setFindValueDate] = useState<Date>(new Date('2022-01-01'));
    const options = ['All', ...(Object.keys(EmployeeAppointmentObj))];
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const formatYmd = (date: Date) => date.toISOString().slice(0, 10);
    const {getEmployeeAppointments, createEmployeeAppointment, 
           updateEmployeeAppointment, deleteEmployeeAppointment} = useEmployeeAppointment();
    useEffect(()=>{
        dispatch(getEmployeeAppointments('', ''));
    },[dispatch, getEmployeeAppointments]);
    const handleGetClick = () => {
        if(findBy !== 'AppointmentDate' && findBy !== 'DismissalDate')
            return dispatch(getEmployeeAppointments(findBy, findValue));
        dispatch(getEmployeeAppointments(findBy, formatYmd(findValueDate)));
    }
    const handleInsertClick = () => {
        setId(undefined);
        setPersonId(undefined);
        setEmployeePositionId(undefined);
        setAreaId(undefined);
        setAreaIdIsNull(false);
        setBrigadeId(undefined);
        setBrigadeIdIsNull(false);
        setAppointmentDate(new Date());
        setPopUpDisplayInsert(true);
        setDismissalDateIsNull(false);
    };
    const handleCancelClick = () => {
        if(popUpDisplayInsert)
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete)
            setPopUpDisplayUpdateDelete(false);
    };
    const handleConfirmClick = async () => {
        if(!id || !PersonId || !EmployeePositionId  || !AppointmentDate)
            return alert('You need to fill in all the required fields in the form!');
        console.log(AreaId);
        if(popUpDisplayInsert && await createEmployeeAppointment({
            id, 
            AreaId: AreaIdIsNull ? null : AreaId!, 
            BrigadeId: BrigadeIdIsNull ? null : BrigadeId!, 
            PersonId,
            EmployeePositionId,
            AppointmentDate: formatYmd(AppointmentDate),
            DismissalDate: DismissalDateIsNull ? null : formatYmd(DismissalDate)
        }))
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete && await updateEmployeeAppointment({
            id, 
            AreaId: AreaIdIsNull ? null : AreaId!, 
            BrigadeId: BrigadeIdIsNull ? null : BrigadeId!, 
            PersonId,
            EmployeePositionId,
            AppointmentDate: formatYmd(AppointmentDate),
            DismissalDate: DismissalDateIsNull ? null : formatYmd(DismissalDate)
        }))
            setPopUpDisplayUpdateDelete(false);
    };
    const handleClickTableItem = (data: Object) => {
        const item = data as IEmployeeAppointment;
        setPopUpDisplayUpdateDelete(true);
        setId(item.id);
        setPersonId(item.PersonId);
        setEmployeePositionId(item.EmployeePositionId);
        setAreaId(item.AreaId ? item.AreaId : undefined);
        if(item.AreaId !== null)
            setAreaIdIsNull(false);
        else
            setAreaIdIsNull(true);
        setBrigadeId(item.BrigadeId ? item.BrigadeId : undefined);
        if(item.BrigadeId !== null)
            setBrigadeIdIsNull(false);
        else
            setBrigadeIdIsNull(true);
        setAppointmentDate(new Date(item.AppointmentDate));
        setDismissalDate(item.DismissalDate ? new Date(item.DismissalDate) : new Date());
        if(item.DismissalDate !== null)
            setDismissalDateIsNull(false);
        else
            setDismissalDateIsNull(true);
    };
    const handleDeleteClick = async () => {
        if(id && await deleteEmployeeAppointment({id}))
            setPopUpDisplayUpdateDelete(false);
    };
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>EMPLOYEE APPOINTMENT FIND MENU</Title>
            <List>
                <ListSelect value={findBy} setValue={setFindBy} options={options}>Find by</ListSelect>
                {findBy !== 'AppointmentDate' && findBy !== 'DismissalDate'
                    ?
                    <ListInput disabled={findBy === 'All'} value={findValue} setValue={setFindValue} placeholder={'Find value...'}>Find value</ListInput>
                    :
                    <ListDateItem value={formatYmd(findValueDate)} setValue={setFindValueDate}>Find value</ListDateItem>
                }
                
            </List>
        </Body>
        <Body>
            <Title>EMPLOYEE APPOINTMENT MENU</Title>
            <List>
                <ListItem onClick={handleGetClick}>Get</ListItem>
                <ListItem onClick={handleInsertClick}>Insert</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>EMPLOYEE APPOINTMENT TABLE</Title>
            <Table onClickItem={handleClickTableItem} data={data}/>
        </Body>
        {(popUpDisplayInsert || popUpDisplayUpdateDelete) && 
            <Popup setPopUpDisplay={popUpDisplayInsert ? setPopUpDisplayInsert : setPopUpDisplayUpdateDelete}>
                <Title>{popUpDisplayInsert ? 'EMPLOYEE APPOINTMENT INSERT' : 'EMPLOYEE APPOINTMENT UPDATE/DELETE'}</Title>
                <List>
                    <ListInput disabled={popUpDisplayUpdateDelete} value={String(id)} setValue={setId} placeholder={'Id...'}>Id*</ListInput>
                    <ListInput value={String(PersonId)} setValue={setPersonId} placeholder={'PersonId...'}>PersonId*</ListInput>
                    <ListInput value={String(EmployeePositionId)} setValue={setEmployeePositionId} placeholder={'EmployeePositionId...'}>EmployeePositionId*</ListInput>
                    <ListInput nulable={true} checkBoxValue={AreaIdIsNull} setCheckBoxValue={setAreaIdIsNull} value={String(AreaId)} setValue={setAreaId} placeholder={'AreaId...'}>AreaId</ListInput>
                    <ListInput nulable={true} checkBoxValue={BrigadeIdIsNull} setCheckBoxValue={setBrigadeIdIsNull} value={String(BrigadeId)} setValue={setBrigadeId} placeholder={'BrigadeId...'}>BrigadeId</ListInput>
                    <ListDateItem value={formatYmd(AppointmentDate)} setValue={setAppointmentDate}>AppointmentDate*</ListDateItem>
                    <ListDateItem nulable={true} checkBoxValue={DismissalDateIsNull} setCheckBoxValue={setDismissalDateIsNull} value={formatYmd(DismissalDate)} setValue={setDismissalDate}>DismissalDate*</ListDateItem>
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