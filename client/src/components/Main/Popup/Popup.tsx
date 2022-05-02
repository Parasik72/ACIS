import { FC } from "react";
import { Body } from "../Body/Body";
import styles from './Popup.module.scss';

interface IPopup {
    setPopUpDisplay: React.Dispatch<React.SetStateAction<any>>;
}

export const Popup: FC<IPopup> = ({setPopUpDisplay, children}) => {
    const closePopupHandler = () => {
        setPopUpDisplay(false);
    }
    return (
        <div className={styles.popup} onMouseDown={closePopupHandler}>
            <Body>
                {children}
            </Body>
        </div>
    );
};