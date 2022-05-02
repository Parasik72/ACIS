import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ERole, useRole } from "../../actions/role.action";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Body } from "./Body/Body";
import { List } from "./List/List";
import { ListItem } from "./List/ListItem/ListItem";
import { ListItemLink } from "./List/ListItemLink/ListItemLink";
import { Title } from "./Title/Title";

export const Main: FC = () => {
    const role = useTypedSelector(state => state.role.role);
	const dispatch = useDispatch();
	const {checkRole, setAdminRole, setManagerRole, setUserRole} = useRole();
	useEffect(() => {
		dispatch(checkRole());
	}, [checkRole, dispatch]);
    return (
        <>
        <Body>
            <Title>ROLES</Title>
            <List>
                <ListItem isChecked={role === ERole.USER} onClickDispatch={() => dispatch(setUserRole())}>USER</ListItem>
                <ListItem isChecked={role === ERole.MANAGER} onClickDispatch={() => dispatch(setManagerRole())}>MANAGER</ListItem>
                <ListItem isChecked={role === ERole.ADMIN} onClickDispatch={() => dispatch(setAdminRole())}>ADMIN</ListItem>
            </List>
        </Body>
        <Body>
            <Title>TABLES</Title>
            <List>
                <ListItemLink to='/person'>Person</ListItemLink>
                <ListItemLink to='/employee-appointment'>Employee appointment</ListItemLink>
                <ListItemLink to='/employee-position'>Employee position</ListItemLink>
                <ListItemLink to='/company'>Company</ListItemLink>
                <ListItemLink to='/manufactory'>Manufactory</ListItemLink>
                <ListItemLink to='/area'>Area</ListItemLink>
                <ListItemLink to='/brigade'>Brigade</ListItemLink>
                <ListItemLink to='/product'>Product</ListItemLink>
                <ListItemLink to='/product-category'>Product category</ListItemLink>
                <ListItemLink to='/attribute'>Attribute</ListItemLink>
                <ListItemLink to='/polygon'>Polygon</ListItemLink>
                <ListItemLink to='/test'>Test</ListItemLink>
                <ListItemLink to='/equipment'>Equipment</ListItemLink>
                <ListItemLink to='/product-movement-accounting'>Product movement accounting</ListItemLink>
                <ListItemLink to='/area-brigade-product'>Area brigade product</ListItemLink>
                <ListItemLink to='/position-attribute'>Position attribute</ListItemLink>
                <ListItemLink to='/test-employee-appointment'>Test employee appointment</ListItemLink>
                <ListItemLink to='/test-equipment'>Test equipment</ListItemLink>
                <ListItemLink to='/manufactory-polygon'>Manufactory polygon</ListItemLink>
            </List>
        </Body>
        <Body>
            <Title>PROCEDURES AND FUNCTIONS</Title>
            <List>
                <ListItemLink to='/list-of-products-of-a-separate-category'>List of products of a separate category</ListItemLink>
                <ListItemLink to='/list-of-products-of-a-separate-category-certin-time-quantity'>List of products of a separate category certin time quantity</ListItemLink>
                <ListItemLink to='/list-of-products-of-a-separate-category-certin-time'>List of products of a separate category certin time</ListItemLink>
                <ListItemLink to='/list-of-workers'>List of workers</ListItemLink>
                <ListItemLink to='/list-of-areas-quantity'>List of areas quantity</ListItemLink>
                <ListItemLink to='/list-of-areas'>List of areas</ListItemLink>
                <ListItemLink to='/list-of-works'>List of works</ListItemLink>
                <ListItemLink to='/brigade-compositions'>Brigade compositions</ListItemLink>
                <ListItemLink to='/list-of-masters'>List of masters</ListItemLink>
                <ListItemLink to='/list-of-products-of-a-separate-category-collects-now'>List of products of a separate category collects now</ListItemLink>
                <ListItemLink to='/brigade-composition-collects-product'>Brigade composition collects product</ListItemLink>
                <ListItemLink to='/list-of-polygons-testing-product'>List of polygons testing product</ListItemLink>
                <ListItemLink to='/list-of-products-of-a-separate-category-testing-in-polygons'>List of products of a separate category testing in polygons</ListItemLink>
                <ListItemLink to='/list-of-testers-testing-product'>List of testers testing product</ListItemLink>
                <ListItemLink to='/list-of-equipment-using-test'>List of equipment using test</ListItemLink>
                <ListItemLink to='/list-of-products-collects-now-quantity'>List of products collects now quantity</ListItemLink>
                <ListItemLink to='/list-of-products-collects-now'>List of products collects now</ListItemLink>
            </List>
        </Body>
        </>
    );
};