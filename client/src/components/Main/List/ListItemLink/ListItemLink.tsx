import { FC } from "react";
import { Link } from "react-router-dom";
import styles from '../../Main.module.scss';

interface IListItemLink {
    to: string
}

export const ListItemLink: FC<IListItemLink> = ({children, to}) => {
    return (
        <Link to={to}><div className={styles.main_item}>{children}</div></Link>
    );
};