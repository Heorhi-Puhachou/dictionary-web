import Dictionary from '../dictionary/Dictionary';
import './Base.css';
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import React, {useEffect} from 'react';
import {LACINK_TAG, NARKAM_TAG, TARASK_TAG} from './constant';
import {StyleSelector} from './StyleSelector';
import {useDispatch, useSelector} from "react-redux";

function Base() {

    const style = useSelector(state => state.style);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        //http://localhost:3000/narkam
        //                      narkam - location.pathname.substring(1, 7)
        let initStyle = location.pathname.length > 6 ? location.pathname.substring(1, 7) : '';
        if (initStyle === NARKAM_TAG) {
            dispatch({type: NARKAM_TAG});
        }
        if (initStyle === LACINK_TAG) {
            dispatch({type: LACINK_TAG});
        }
        if (initStyle === TARASK_TAG) {
            dispatch({type: TARASK_TAG});
        }

    }, []);

    return (
        <div id="base" className="display-linebreak">
            <div className="style">
                <StyleSelector/>
            </div>
            <Routes>
                <Route key='1' path={`/${style}`} element={<Dictionary/>}/>
                <Route path="" element={<Navigate to={`${style}`}/>}/>
            </Routes>
        </div>);
}

export default Base;