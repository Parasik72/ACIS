import { FC } from "react";
import styles from './ListDateItem.module.scss';

interface IListDateItem {
    nulable?: boolean;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<any>>;
    checkBoxValue?: boolean;
    setCheckBoxValue?: React.Dispatch<React.SetStateAction<any>>;
}

export const ListDateItem: FC<IListDateItem> = ({children, value, setValue, nulable, checkBoxValue, setCheckBoxValue}) => {
    return (
        <div className={styles.inputDate}>
            <h4>{children}</h4>
            <input style={checkBoxValue ? {backgroundColor: '#cacaca'} : {}} disabled={checkBoxValue} value={value === 'undefined' ? '' : value} onChange={e => setValue(new Date(e.target.value))} type="date"/>
            {nulable && <><input checked={checkBoxValue} onChange={e => setCheckBoxValue ? setCheckBoxValue(!checkBoxValue) : ()=>{}} className={styles.checkbox} type="checkbox"/><span>Is null?</span></>}
        </div>
    );
};