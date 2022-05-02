import { FC } from "react";
import styles from './ListBtns.module.scss';

interface IListBtns{
    width?: string;
}

export const ListBtns: FC<IListBtns> = ({children, width}) => {
    return (
        <div style={{width}} className={styles.listBtns}>
            {children}
        </div>
    );
};