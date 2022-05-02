import { FC } from "react";
import styles from '../Main.module.scss';

export const List: FC = ({children}) => {
    return (
        <div className={styles.main_items}>{children}</div>
    );
};