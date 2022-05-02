import { FC } from "react";
import styles from './Title.module.scss';

export const Title: FC = ({children}) => {
    return (
        <div className={styles.title}>
            <h3>{children}</h3>
        </div>
    );
};