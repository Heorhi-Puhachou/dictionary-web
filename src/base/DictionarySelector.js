import React from 'react';
import * as constants from './constant';
import './StyleSelector.css';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";

export function DictionarySelector() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const urlDictionaries = queryParams.get('dictionaries') === null ? 'abc' : queryParams.get('dictionaries');
    const storeDictionaries = useSelector(state => state.dictionaries);


    const onChangeDictionary = (event) => {
        const changeDictionary = event.target.value;

        let newDictionaries;

        if (urlDictionaries.includes(changeDictionary)) {
            newDictionaries = urlDictionaries.replace(changeDictionary, '');
        } else {
            newDictionaries = urlDictionaries + changeDictionary;
        }

        let newLocation;
        if (location.search) {
            newLocation = location.pathname + location.search.replace('dictionaries=' + urlDictionaries, 'dictionaries=' + newDictionaries);
        } else {
            newLocation = location.pathname + '?dictionaries=' + newDictionaries;
        }
        navigate(newLocation);

        dispatch({type: 'setDictionaries', dictionaries: newDictionaries});
    };

    return (
        <div className="style-selector" onChange={onChangeDictionary}>
            <input type="checkbox"
                   value='a'
                   name="dictionary"
                   checked={storeDictionaries.includes('a')}
                   onChange={() => {
                   }}/>{'a'}
            <input type="checkbox"
                   value='b'
                   name="dictionary"
                   checked={storeDictionaries.includes('b')}
                   onChange={() => {
                   }}/>{'b'}
            <input type="checkbox"
                   value='c'
                   name="dictionary"
                   checked={storeDictionaries.includes('c')}
                   onChange={() => {
                   }}/>{'c'}
        </div>
    );
}