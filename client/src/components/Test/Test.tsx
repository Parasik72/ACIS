import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTest } from "../../actions/test.action";
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
import { ITest, TestObj } from "./Test.type";

export const Test: FC = () => {
    const [id, setId] = useState<number>();
    const [ProductId, setProductId] = useState<number>();
    const [PolygonId, setPolygonId] = useState<number>();
    const [Result, setResult] = useState<string>('');
    const [DateA, setDateA] = useState<Date>(new Date());
    const [DateAIsNull, setDateAIsNull] = useState<boolean>(false);
    const [popUpDisplayInsert, setPopUpDisplayInsert] = useState<boolean>(false);
    const [popUpDisplayUpdateDelete, setPopUpDisplayUpdateDelete] = useState<boolean>(false);
    const [findBy, setFindBy] = useState<string>('All');
    const [findValue, setFindValue] = useState<string>('');
    const [findValueDate, setFindValueDate] = useState<Date>(new Date('2022-01-01'));
    const options = ['All', ...(Object.keys(TestObj))];
    const formatYmd = (date: Date) => date.toISOString().slice(0, 10);
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getTests, createTest, updateTest, deleteTest} = useTest();
    useEffect(()=>{
        dispatch(getTests('', ''));
    },[dispatch, getTests]);
    const handleGetClick = () => {
        if(findBy !== 'Date')
            return dispatch(getTests(findBy, findValue));
        dispatch(getTests(findBy, formatYmd(findValueDate)));
    }
    const handleInsertClick = () => {
        setId(undefined);
        setProductId(undefined);
        setPolygonId(undefined);
        setResult('');
        setDateA(new Date());
        setDateAIsNull(false);
        setPopUpDisplayInsert(true);
    };
    const handleCancelClick = () => {
        if(popUpDisplayInsert)
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete)
            setPopUpDisplayUpdateDelete(false);
    };
    const handleConfirmClick = async () => {
        if(!id || !ProductId || !PolygonId || !Result)
            return alert('You need to fill in all the required fields in the form!');
        if(popUpDisplayInsert && await createTest({id, PolygonId, ProductId, Result, Date: DateAIsNull ? null : formatYmd(DateA)}))
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete && await updateTest({id, PolygonId, ProductId, Result, Date: DateAIsNull ? null : formatYmd(DateA)}))
            setPopUpDisplayUpdateDelete(false);
    };
    const handleClickTableItem = (data: Object) => {
        const item = data as ITest;
        setPopUpDisplayUpdateDelete(true);
        setId(item.id);
        setProductId(item.ProductId);
        setPolygonId(item.PolygonId);
        setResult(item.Result);
        setDateA(item.Date ? new Date(item.Date) : new Date());
        if(item.Date !== null)
            setDateAIsNull(false);
        else
            setDateAIsNull(true);
    };
    const handleDeleteClick = async () => {
        if(id && await deleteTest({id}))
            setPopUpDisplayUpdateDelete(false);
    };
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>TEST FIND MENU</Title>
            <List>
                <ListSelect value={findBy} setValue={setFindBy} options={options}>Find by</ListSelect>
                {findBy !== 'Date' 
                    ?
                    <ListInput disabled={findBy === 'All'} value={findValue} setValue={setFindValue} placeholder={'Find value...'}>Find value</ListInput>
                    :
                    <ListDateItem value={formatYmd(findValueDate)} setValue={setFindValueDate}>Find value</ListDateItem>
                }
                
            </List>
        </Body>
        <Body>
            <Title>TEST MENU</Title>
            <List>
                <ListItem onClick={handleGetClick}>Get</ListItem>
                <ListItem onClick={handleInsertClick}>Insert</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>TEST TABLE</Title>
            <Table onClickItem={handleClickTableItem} data={data}/>
        </Body>
        {(popUpDisplayInsert || popUpDisplayUpdateDelete) && 
            <Popup setPopUpDisplay={popUpDisplayInsert ? setPopUpDisplayInsert : setPopUpDisplayUpdateDelete}>
                <Title>{popUpDisplayInsert ? 'TEST INSERT' : 'TEST UPDATE/DELETE'}</Title>
                <List>
                    <ListInput disabled={popUpDisplayUpdateDelete} value={String(id)} setValue={setId} placeholder={'Id...'}>Id*</ListInput>
                    <ListInput value={String(ProductId)} setValue={setProductId} placeholder={'ProductId...'}>ProductId*</ListInput>
                    <ListInput value={String(PolygonId)} setValue={setPolygonId} placeholder={'PolygonId...'}>PolygonId*</ListInput>
                    <ListInput value={Result} setValue={setResult} placeholder={'Result...'}>Result*</ListInput>
                    <ListDateItem nulable={true} checkBoxValue={DateAIsNull} setCheckBoxValue={setDateAIsNull} value={formatYmd(DateA)} setValue={setDateA}>Date*</ListDateItem>
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