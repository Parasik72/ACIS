import { FC } from "react";
import styles from './Loader.module.scss';

export const Loader: FC = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.ldsRoller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
}