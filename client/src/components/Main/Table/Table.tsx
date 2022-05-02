import { FC, useCallback, useEffect, useState } from "react";
import styles from './Table.module.scss';

interface ITable {
    data: Array<Object>;
    onClickItem?: (obj: Object) => void; 
}

export const Table: FC<ITable> = ({data, onClickItem}) => {
    const [keys, setKeys] = useState<string[]>([]);
    const voidFunc = () => {};
    const getKeys = useCallback(() => {
        if(data.length)
            setKeys(Object.keys(data[0]));
    }, [setKeys, data]);
    useEffect(()=>{
        getKeys();
    }, [getKeys]);
    if(!keys.length)
        return (<></>);
    return (
        <div>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.table_head_tr}>
                        {keys?.map((item: string, index: number) => <th key={index + Math.random()}>{item}</th> )}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((itemData: any, index: number) => {
                        return (
                            <tr onClick={onClickItem ? () => {onClickItem(itemData)} : voidFunc} key={index + Math.random()} className={styles.table_body_tr}>
                                {keys?.map((itemKey: string, index: number) => {
                                    return (
                                        <td key={index + Math.random()}><h4>{itemData[itemKey] ? itemData[itemKey] : <span>NULL</span>}</h4></td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};