import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useProductMovementAccounting } from "../../actions/product-movement-accounting.action";
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
import { IProductMovementAccounting, ProductMovementAccountingObj } from "./ProductMovementAccounting.type";

export const ProductMovementAccounting: FC = () => {
    const [id, setId] = useState<number>();
    const [ProductId, setProductId] = useState<number>();
    const [CompanyId, setCompanyId] = useState<number>();
    const [State, setState] = useState<string>('');
    const [popUpDisplayInsert, setPopUpDisplayInsert] = useState<boolean>(false);
    const [popUpDisplayUpdateDelete, setPopUpDisplayUpdateDelete] = useState<boolean>(false);
    const [findBy, setFindBy] = useState<string>('All');
    const [findValue, setFindValue] = useState<string>('');
    const options = ['All', ...(Object.keys(ProductMovementAccountingObj))];
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getProuctsMovementAccouinting, createProuctMovementAccouinting, 
           updateProuctMovementAccouinting, deleteProuctMovementAccouinting} = useProductMovementAccounting();
    useEffect(()=>{
        dispatch(getProuctsMovementAccouinting('', ''));
    },[dispatch, getProuctsMovementAccouinting]);
    const handleGetClick = () => {
        return dispatch(getProuctsMovementAccouinting(findBy, findValue));
    }
    const handleInsertClick = () => {
        setProductId(undefined);
        setCompanyId(undefined);
        setState('');
        setPopUpDisplayInsert(true);
    };
    const handleCancelClick = () => {
        if(popUpDisplayInsert)
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete)
            setPopUpDisplayUpdateDelete(false);
    };
    const handleConfirmClick = async () => {
        if(!ProductId || !CompanyId || !State)
            return alert('You need to fill in all the required fields in the form!');
        if(popUpDisplayInsert && await createProuctMovementAccouinting({id, CompanyId, ProductId, State}))
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete && await updateProuctMovementAccouinting({id, CompanyId, ProductId, State}))
            setPopUpDisplayUpdateDelete(false);
    };
    const handleClickTableItem = (data: Object) => {
        const item = data as IProductMovementAccounting;
        setPopUpDisplayUpdateDelete(true);
        setId(item.id);
        setProductId(item.ProductId);
        setCompanyId(item.CompanyId);
        setState(item.State);
    };
    const handleDeleteClick = async () => {
        if(id && await deleteProuctMovementAccouinting({id}))
            setPopUpDisplayUpdateDelete(false);
    };
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>PRODUCT MOVEMENT ACCOUNTING FIND MENU</Title>
            <List>
                <ListSelect value={findBy} setValue={setFindBy} options={options}>Find by</ListSelect>
                <ListInput disabled={findBy === 'All'} value={findValue} setValue={setFindValue} placeholder={'Find value...'}>Find value</ListInput>
            </List>
        </Body>
        <Body>
            <Title>PRODUCT MOVEMENT ACCOUNTING MENU</Title>
            <List>
                <ListItem onClick={handleGetClick}>Get</ListItem>
                <ListItem onClick={handleInsertClick}>Insert</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>PRODUCT MOVEMENT ACCOUNTING TABLE</Title>
            <Table onClickItem={handleClickTableItem} data={data}/>
        </Body>
        {(popUpDisplayInsert || popUpDisplayUpdateDelete) && 
            <Popup setPopUpDisplay={popUpDisplayInsert ? setPopUpDisplayInsert : setPopUpDisplayUpdateDelete}>
                <Title>{popUpDisplayInsert ? 'PRODUCT MOVEMENT ACCOUNTING INSERT' : 'PRODUCT MOVEMENT ACCOUNTING UPDATE/DELETE'}</Title>
                <List>
                    <ListInput disabled={popUpDisplayUpdateDelete} value={String(id)} setValue={setId} placeholder={'Id...'}>Id*</ListInput>
                    <ListInput value={String(ProductId)} setValue={setProductId} placeholder={'ProductId...'}>ProductId*</ListInput>
                    <ListInput value={String(CompanyId)} setValue={setCompanyId} placeholder={'CompanyId...'}>CompanyId*</ListInput>
                    <ListInput value={State} setValue={setState} placeholder={'State...'}>State*</ListInput>
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