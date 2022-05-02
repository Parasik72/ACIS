import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useProduct } from "../../actions/product.action";
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
import { IProduct, ProductObj } from "./Product.type";

export const Product: FC = () => {
    const [id, setId] = useState<number>();
    const [Name, setName] = useState<string>('');
    const [CollectionDate, setCollectionDate] = useState<Date>(new Date());
    const [CollectionDateIsNull, setCollectionDateIsNull] = useState<boolean>(false);
    const [CategoryId, setCategoryId] = useState<number>();
    const [popUpDisplayInsert, setPopUpDisplayInsert] = useState<boolean>(false);
    const [popUpDisplayUpdateDelete, setPopUpDisplayUpdateDelete] = useState<boolean>(false);
    const [findBy, setFindBy] = useState<string>('All');
    const [findValue, setFindValue] = useState<string>('');
    const [findValueDate, setFindValueDate] = useState<Date>(new Date('2022-01-01'));
    const options = ['All', ...(Object.keys(ProductObj))];
    const formatYmd = (date: Date) => date.toISOString().slice(0, 10);
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getProducts, createProduct, updateProduct, deleteProduct} = useProduct();
    useEffect(()=>{
        dispatch(getProducts('', ''));
    },[dispatch, getProducts]);
    const handleGetClick = () => {
        if(findBy !== 'CollectionDate')
            return dispatch(getProducts(findBy, findValue));
        dispatch(getProducts(findBy, formatYmd(findValueDate)));
    }
    const handleInsertClick = () => {
        setId(undefined);
        setName('');
        setCollectionDate(new Date());
        setCollectionDateIsNull(false);
        setCategoryId(undefined);
        setPopUpDisplayInsert(true);
    };
    const handleCancelClick = () => {
        if(popUpDisplayInsert)
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete)
            setPopUpDisplayUpdateDelete(false);
    };
    const handleConfirmClick = async () => {
        if(!id || !Name  || !CategoryId)
            return alert('You need to fill in all the required fields in the form!');
        if(popUpDisplayInsert && await createProduct({id, CategoryId, Name, CollectionDate: CollectionDateIsNull ? null : formatYmd(CollectionDate)}))
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete && await updateProduct({id, CategoryId, Name, CollectionDate: CollectionDateIsNull ? null : formatYmd(CollectionDate)}))
            setPopUpDisplayUpdateDelete(false);
    };
    const handleClickTableItem = (data: Object) => {
        const item = data as IProduct;
        setPopUpDisplayUpdateDelete(true);
        setId(item.id);
        setName(item.Name);
        setCollectionDate(item.CollectionDate ? new Date(item.CollectionDate) : new Date());
        if(item.CollectionDate !== null)
            setCollectionDateIsNull(false);
        else
            setCollectionDateIsNull(true);
        setCategoryId(item.CategoryId);
    };
    const handleDeleteClick = async () => {
        if(id && await deleteProduct({id}))
            setPopUpDisplayUpdateDelete(false);
    };
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>PRODUCT FIND MENU</Title>
            <List>
                <ListSelect value={findBy} setValue={setFindBy} options={options}>Find by</ListSelect>
                {findBy !== 'CollectionDate' 
                    ?
                    <ListInput disabled={findBy === 'All'} value={findValue} setValue={setFindValue} placeholder={'Find value...'}>Find value</ListInput>
                    :
                    <ListDateItem value={formatYmd(findValueDate)} setValue={setFindValueDate}>Find value</ListDateItem>
                }
                
            </List>
        </Body>
        <Body>
            <Title>PRODUCT MENU</Title>
            <List>
                <ListItem onClick={handleGetClick}>Get</ListItem>
                <ListItem onClick={handleInsertClick}>Insert</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>PRODUCT TABLE</Title>
            <Table onClickItem={handleClickTableItem} data={data}/>
        </Body>
        {(popUpDisplayInsert || popUpDisplayUpdateDelete) && 
            <Popup setPopUpDisplay={popUpDisplayInsert ? setPopUpDisplayInsert : setPopUpDisplayUpdateDelete}>
                <Title>{popUpDisplayInsert ? 'PRODUCT INSERT' : 'PRODUCT UPDATE/DELETE'}</Title>
                <List>
                    <ListInput disabled={popUpDisplayUpdateDelete} value={String(id)} setValue={setId} placeholder={'Id...'}>Id*</ListInput>
                    <ListInput value={Name} setValue={setName} placeholder={'Name...'}>Name*</ListInput>
                    <ListDateItem nulable={true} checkBoxValue={CollectionDateIsNull} setCheckBoxValue={setCollectionDateIsNull} value={formatYmd(CollectionDate)} setValue={setCollectionDate}>CollectionDate*</ListDateItem>
                    <ListInput value={String(CategoryId)} setValue={setCategoryId} placeholder={'CategoryId...'}>CategoryId*</ListInput>
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