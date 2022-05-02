import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAttribute } from "../../actions/attribute";
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
import { AttributeObj, IAttribute } from "./Attribute.type";

export const Attribute: FC = () => {
    const [id, setId] = useState<number>();
    const [ProductId, setProductId] = useState<number>();
    const [Name, setName] = useState<string>('');
    const [Property, setProperty] = useState<string>('');
    const [Value, setValue] = useState<string>('');
    const [popUpDisplayInsert, setPopUpDisplayInsert] = useState<boolean>(false);
    const [popUpDisplayUpdateDelete, setPopUpDisplayUpdateDelete] = useState<boolean>(false);
    const [findBy, setFindBy] = useState<string>('All');
    const [findValue, setFindValue] = useState<string>('');
    const options = ['All', ...(Object.keys(AttributeObj))];
    const data = useTypedSelector(state => state.table.data);
    const isLoaded = useTypedSelector(state => state.table.isLoaded);
    const dispatch = useDispatch();
    const {getAttributes, createAttribute, updateAttribute, deleteAttribute} = useAttribute();
    useEffect(()=>{
        dispatch(getAttributes('', ''));
    },[dispatch, getAttributes]);
    const handleGetClick = () => {
        return dispatch(getAttributes(findBy, findValue));
    }
    const handleInsertClick = () => {
        setId(undefined);
        setProductId(undefined);
        setName('');
        setProperty('');
        setValue('');
        setPopUpDisplayInsert(true);
    };
    const handleCancelClick = () => {
        if(popUpDisplayInsert)
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete)
            setPopUpDisplayUpdateDelete(false);
    };
    const handleConfirmClick = async () => {
        if(!id || !Name || !Property || !ProductId || !Value)
            return alert('You need to fill in all the required fields in the form!');
        if(popUpDisplayInsert && await createAttribute({id, Name, ProductId, Property, Value}))
            setPopUpDisplayInsert(false);
        if(popUpDisplayUpdateDelete && await updateAttribute({id, Name, ProductId, Property, Value}))
            setPopUpDisplayUpdateDelete(false);
    };
    const handleClickTableItem = (data: Object) => {
        const item = data as IAttribute;
        setPopUpDisplayUpdateDelete(true);
        setId(item.id);
        setProductId(item.ProductId);
        setName(item.Name);
        setProperty(item.Property);
        setValue(item.Value);
    };
    const handleDeleteClick = async () => {
        if(id && await deleteAttribute({id}))
            setPopUpDisplayUpdateDelete(false);
    };
    if(!isLoaded)
        return <Loader />;
    return (
        <>
        <Body>
            <Title>ATTRIBUTE FIND MENU</Title>
            <List>
                <ListSelect value={findBy} setValue={setFindBy} options={options}>Find by</ListSelect>
                <ListInput disabled={findBy === 'All'} value={findValue} setValue={setFindValue} placeholder={'Find value...'}>Find value</ListInput>
            </List>
        </Body>
        <Body>
            <Title>ATTRIBUTE MENU</Title>
            <List>
                <ListItem onClick={handleGetClick}>Get</ListItem>
                <ListItem onClick={handleInsertClick}>Insert</ListItem>
            </List>
        </Body>
        <Body isDWidth={true}>
            <Title>ATTRIBUTE TABLE</Title>
            <Table onClickItem={handleClickTableItem} data={data}/>
        </Body>
        {(popUpDisplayInsert || popUpDisplayUpdateDelete) && 
            <Popup setPopUpDisplay={popUpDisplayInsert ? setPopUpDisplayInsert : setPopUpDisplayUpdateDelete}>
                <Title>{popUpDisplayInsert ? 'ATTRIBUTE INSERT' : 'ATTRIBUTE UPDATE/DELETE'}</Title>
                <List>
                    <ListInput disabled={popUpDisplayUpdateDelete} value={String(id)} setValue={setId} placeholder={'Id...'}>Id*</ListInput>
                    <ListInput value={String(ProductId)} setValue={setProductId} placeholder={'ProductId...'}>ProductId*</ListInput>
                    <ListInput value={Name} setValue={setName} placeholder={'Name...'}>Name*</ListInput>
                    <ListInput value={Property} setValue={setProperty} placeholder={'Property...'}>Property*</ListInput>
                    <ListInput value={Value} setValue={setValue} placeholder={'Value...'}>Value*</ListInput>
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