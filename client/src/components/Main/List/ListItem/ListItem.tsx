import { FC } from "react";
import styles from './ListItem.module.scss';

interface IListItem {
    onClick?: () => any;
    onClickDispatch?: (dispatch: any) => void;
    isChecked?: boolean;
}

export const ListItem: FC<IListItem> = ({children, onClick, isChecked, onClickDispatch}) => {
    const voidFunc = () => {};
    return (
        <div style={isChecked ? {color: '#fff', backgroundColor: '#0066ff',  border: '1px solid #ff0000'} : {}} 
             onClick={onClick ? onClick : onClickDispatch ? onClickDispatch : voidFunc} className={styles.item}>{children}</div>
    );
};