import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAreaBrigadeProduct } from "../../actions/area-brigade-product.action";
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
import { AreaBrigadeProductObj, IAreaBrigadeProduct } from "./AreaBrigadeProduct.type";

export const AreaBrigadeProduct: FC = () => {
    const [AreaId, setAreaId] = useState<number>();
    const [BrigadeId, setBrigadeId] = useState<number>();
    const [ProductId, setProductId] = useState<number>();
    const [BeforeAreaId, setBeforeAreaId] = useState<number>();
    const [BeforeBrigadeId, setBeforeBrigadeId] = useState<number>();
    const [BeforeProductId, setBeforeProductId] = useState<number>();
    const [popUpDisplayInsert, setPopUpDisplayInsert] = useState<boolean>(false);
    const [popUpDisplayUpdateDelete, setPopUpDisplayUpdateDelete] = useState<boolean>(false);
    const [findBy, setFindBy] = useState<string>('All');
    const [findValue, setFindValue] = useState<string>('');
    const options = ['All', ...(Object.keys(AreaBrigadeProductObj))];
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getAreaBrigadeProducts, createAreaBrigadeProduct, 
           updateAreaBrigadeProduct, deleteAreaBrigadeProduct} = useAreaBrigadeProduct();
    useEffect(()=>{
        dispatch(getAreaBrigadeProducts('', ''));
    },[dispatch, getAreaBrigadeProducts]);
    const handleGetClick = () => {
        return dispatch(getAreaBrigadeProducts(findBy, findValue));
    }
    const handleInsertClick = () => {
        setAreaId(undefined);
        setBrigadeId(undefined);
        setProductId(undefined);
        setPopUpDisplayInsert(true);
    };
    const handleCancelClick = () => {
        if(popUpDisplayInsert)
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete)
            setPopUpDisplayUpdateDelete(false);
    };
    const handleConfirmClick = async () => {
        if(!AreaId || !BrigadeId || !ProductId)
            return alert('You need to fill in all the required fields in the form!');
        if(popUpDisplayInsert && await createAreaBrigadeProduct({AreaId, BrigadeId, ProductId}))
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete && BeforeAreaId && BeforeBrigadeId && BeforeProductId && 
            await updateAreaBrigadeProduct({AreaId: Number(AreaId), BrigadeId: Number(BrigadeId), ProductId: Number(ProductId), BeforeAreaId, BeforeBrigadeId, BeforeProductId}))
        setPopUpDisplayUpdateDelete(false);
    };
    const handleClickTableItem = (data: Object) => {
        const item = data as IAreaBrigadeProduct;
        setPopUpDisplayUpdateDelete(true);
        setAreaId(item.AreaId);
        setBrigadeId(item.BrigadeId);
        setProductId(item.ProductId);
        setBeforeAreaId(item.AreaId);
        setBeforeBrigadeId(item.BrigadeId);
        setBeforeProductId(item.ProductId);
    };
    const handleDeleteClick = async () => {
        if(AreaId && BrigadeId && ProductId && await deleteAreaBrigadeProduct({AreaId, BrigadeId, ProductId}))
            setPopUpDisplayUpdateDelete(false);
    };
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>AREA BRIGADE PRODUCT FIND MENU</Title>
            <List>
                <ListSelect value={findBy} setValue={setFindBy} options={options}>Find by</ListSelect>
                <ListInput disabled={findBy === 'All'} value={findValue} setValue={setFindValue} placeholder={'Find value...'}>Find value</ListInput>
            </List>
        </Body>
        <Body>
            <Title>AREA BRIGADE PRODUCT MENU</Title>
            <List>
                <ListItem onClick={handleGetClick}>Get</ListItem>
                <ListItem onClick={handleInsertClick}>Insert</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>AREA BRIGADE PRODUCT TABLE</Title>
            <Table onClickItem={handleClickTableItem} data={data}/>
        </Body>
        {(popUpDisplayInsert || popUpDisplayUpdateDelete) && 
            <Popup setPopUpDisplay={popUpDisplayInsert ? setPopUpDisplayInsert : setPopUpDisplayUpdateDelete}>
                <Title>{popUpDisplayInsert ? 'AREA BRIGADE PRODUCT INSERT' : 'AREA BRIGADE PRODUCT UPDATE/DELETE'}</Title>
                <List>
                    <ListInput value={String(AreaId)} setValue={setAreaId} placeholder={'AreaId...'}>AreaId*</ListInput>
                    <ListInput value={String(BrigadeId)} setValue={setBrigadeId} placeholder={'BrigadeId...'}>BrigadeId*</ListInput>
                    <ListInput value={String(ProductId)} setValue={setProductId} placeholder={'ProductId...'}>ProductId*</ListInput>
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