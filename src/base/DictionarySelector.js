import React from 'react';
import './StyleSelector.css';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";

export function DictionarySelector() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const urlDictionaries = queryParams.get('dictionaries') === null ? 'abcde' : queryParams.get('dictionaries');
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
                   }}/>{'Ubuntu'}
            <input type="checkbox"
                   value='b'
                   name="dictionary"
                   checked={storeDictionaries.includes('b')}
                   onChange={() => {
                   }}/>{'Proton'}
            <input type="checkbox"
                   value='c'
                   name="dictionary"
                   checked={storeDictionaries.includes('c')}
                   onChange={() => {
                   }}/>{'Puhachou'}
            <input type="checkbox"
                   value='d'
                   name="dictionary"
                   checked={storeDictionaries.includes('d')}
                   onChange={() => {
                   }}/>{'Color'}
            <input type="checkbox"
                   value='e'
                   name="dictionary"
                   checked={storeDictionaries.includes('e')}
                   onChange={() => {
                   }}/>{'Skalkovič'}
        </div>
    );
}