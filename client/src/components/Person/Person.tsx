import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usePerson } from "../../actions/person.action";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Body } from "../Main/Body/Body";
import { List } from "../Main/List/List";
import { ListInput } from "../Main/List/ListInput/ListInput";
import { ListItem } from "../Main/List/ListItem/ListItem";
import { ListSelect } from "../Main/List/ListSelect/ListSelect";
import { Loader } from "../Main/Loader/Loader";
import { Table } from "../Main/Table/Table";
import { Title } from "../Main/Title/Title";
import { IPerson, PersonObj } from "./Person.type";
import { ListDateItem } from "../Main/List/ListDateItem/ListDateItem";
import { Popup } from "../Main/Popup/Popup";
import { ListBtns } from "../Main/List/ListBtns/ListBtns";

export const Person: FC = () => {
    const [id, setId] = useState<number>();
    const [Firstname, setFirstname] = useState<string>('');
    const [Lastname, setLastname] = useState<string>('');
    const [Birthday, setBirthday] = useState<Date>(new Date());
    const [popUpDisplayInsert, setPopUpDisplayInsert] = useState<boolean>(false);
    const [popUpDisplayUpdateDelete, setPopUpDisplayUpdateDelete] = useState<boolean>(false);
    const [findBy, setFindBy] = useState<string>('All');
    const [findValue, setFindValue] = useState<string>('');
    const [findValueDate, setFindValueDate] = useState<Date>(new Date('2022-01-01'));
    const options = ['All', ...(Object.keys(PersonObj))];
    const formatYmd = (date: Date) => date.toISOString().slice(0, 10);
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getPersons, createPerson, updatePerson, deletePerson} = usePerson();
    useEffect(()=>{
        dispatch(getPersons('', ''));
    },[dispatch, getPersons]);
    const handleGetClick = () => {
        if(findBy !== 'Birthday')
            return dispatch(getPersons(findBy, findValue));
        dispatch(getPersons(findBy, formatYmd(findValueDate)));
    }
    const handleInsertClick = () => {
        setId(undefined);
        setFirstname('');
        setLastname('');
        setBirthday(new Date());
        setPopUpDisplayInsert(true);
    };
    const handleCancelClick = () => {
        if(popUpDisplayInsert)
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete)
            setPopUpDisplayUpdateDelete(false);
    };
    const handleConfirmClick = async () => {
        if(!id || !Firstname || !Lastname || !Birthday)
            return alert('You need to fill in all the required fields in the form!');
        if(popUpDisplayInsert && await createPerson({id, Firstname, Birthday: formatYmd(Birthday), Lastname}))
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete && await updatePerson({id, Firstname, Birthday: formatYmd(Birthday), Lastname}))
            setPopUpDisplayUpdateDelete(false);
    };
    const handleClickTableItem = (data: Object) => {
        const item = data as IPerson;
        setPopUpDisplayUpdateDelete(true);
        setId(item.id);
        setFirstname(item.Firstname);
        setLastname(item.Lastname);
        setBirthday(new Date(item.Birthday));
    };
    const handleDeleteClick = async () => {
        if(id && await deletePerson({id}))
            setPopUpDisplayUpdateDelete(false);
    };
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>PERSON FIND MENU</Title>
            <List>
                <ListSelect value={findBy} setValue={setFindBy} options={options}>Find by</ListSelect>
                {findBy !== 'Birthday' 
                    ?
                    <ListInput disabled={findBy === 'All'} value={findValue} setValue={setFindValue} placeholder={'Find value...'}>Find value</ListInput>
                    :
                    <ListDateItem value={formatYmd(findValueDate)} setValue={setFindValueDate}>Find value</ListDateItem>
                }
                
            </List>
        </Body>
        <Body>
            <Title>PERSON MENU</Title>
            <List>
                <ListItem onClick={handleGetClick}>Get</ListItem>
                <ListItem onClick={handleInsertClick}>Insert</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>PERSON TABLE</Title>
            <Table onClickItem={handleClickTableItem} data={data}/>
        </Body>
        {(popUpDisplayInsert || popUpDisplayUpdateDelete) && 
            <Popup setPopUpDisplay={popUpDisplayInsert ? setPopUpDisplayInsert : setPopUpDisplayUpdateDelete}>
                <Title>{popUpDisplayInsert ? 'PERSON INSERT' : 'PERSON UPDATE/DELETE'}</Title>
                <List>
                    <ListInput disabled={popUpDisplayUpdateDelete} value={String(id)} setValue={setId} placeholder={'Id...'}>Id*</ListInput>
                    <ListInput value={Firstname} setValue={setFirstname} placeholder={'Firstname...'}>Firstname*</ListInput>
                    <ListInput value={Lastname} setValue={setLastname} placeholder={'Lastname...'}>Lastname*</ListInput>
                    <ListDateItem value={formatYmd(Birthday)} setValue={setBirthday}>Birthday*</ListDateItem>
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