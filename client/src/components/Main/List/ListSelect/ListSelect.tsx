import { FC } from "react";
import styles from './ListSelect.module.scss';

interface IListSelect {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<any>>;
    options: Array<string>;
}

export const ListSelect: FC<IListSelect> = ({children, value, setValue, options}) => {
    return (
        <div className={styles.select}>
            <h4>{children}</h4>
            <select value={value} onChange={e => setValue(e.target.value)}>
                {options.map((item, index) => {
                    return (
                        <option key={index} value={item}>{item}</option>
                    )
                })}
            </select>
        </div>
    );
};