import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUnLoad } from "../../store/reducers/table.reducer";
import styles from './Navbar.module.scss';

const getWidth = () => window.innerWidth 
                    || document.documentElement.clientWidth 
                    || document.body.clientWidth;

export const Navbar: FC = () => {
    const [title, setTitle] = useState<string>('AIRCRAFT COMPANY INFORMATION SYSTEM')
    const [width, setWidth] = useState(getWidth());
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const titleClickHandle = () => {
        dispatch(setUnLoad());
        navigate('/');
    };
    useEffect(() => {
        const resizeListener = () => {
            setWidth(getWidth())
            if(width <= 750 && title === 'AIRCRAFT COMPANY INFORMATION SYSTEM')
                setTitle('ACIS')
            if(width > 750 && title === 'ACIS')
                setTitle('AIRCRAFT COMPANY INFORMATION SYSTEM');
        };
        if(width <= 750 && title === 'AIRCRAFT COMPANY INFORMATION SYSTEM')
            setTitle('ACIS')
        if(width > 750 && title === 'ACIS')
            setTitle('AIRCRAFT COMPANY INFORMATION SYSTEM');
        window.addEventListener('resize', resizeListener);
        return () => window.removeEventListener('resize', resizeListener);
    }, [width, title]);
    return (
        <div className={styles.navbar}>
            <h1 onClick={titleClickHandle}>{title}</h1>
        </div>
    );
}