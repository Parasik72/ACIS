import { FC } from "react";
import styles from './ListInput.module.scss';

interface IListInput {
    nulable?: boolean;
    placeholder: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<any>>;
    disabled?: boolean;
    checkBoxValue?: boolean;
    setCheckBoxValue?: React.Dispatch<React.SetStateAction<any>>;
}

export const ListInput: FC<IListInput> = ({children, placeholder, value, setValue, disabled, nulable, checkBoxValue, setCheckBoxValue}) => {
    return (
        <div className={styles.input}>
            <h4>{children}</h4>
            <input style={disabled || checkBoxValue ? {backgroundColor: '#cacaca'} : {}} disabled={disabled || checkBoxValue} value={value === 'undefined' ? '' : value} 
                   onChange={e => setValue(e.target.value)} type="text" placeholder={placeholder}/>
            {nulable && <><input checked={checkBoxValue} onChange={e => setCheckBoxValue ? setCheckBoxValue(!checkBoxValue) : ()=>{}} className={styles.checkbox} type="checkbox"/><span>Is null?</span></>}
        </div>
    );
};