import { FC } from "react";
import styles from '../Main.module.scss';

interface IBody {
    isDWidth?: boolean;
}

export const Body: FC<IBody> = ({children, isDWidth}) => {
    return (
        <div onMouseDown={e => e.stopPropagation()} className={isDWidth ? styles.dmain : styles.main}>{children}</div>
    );
};