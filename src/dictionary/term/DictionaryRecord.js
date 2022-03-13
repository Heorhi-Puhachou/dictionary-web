import React, {useEffect, useState} from 'react';
import './DictionaryRecord.css';
import {useDispatch, useSelector} from "react-redux";

const DictionaryRecord = props => {

    const termsMap = useSelector(state => state.termsMap);
    const style = useSelector(state => state.style);
    const dispatch = useDispatch();

    const getTextFromState = (dictionaryId, termId) => {
        const key = dictionaryId + style;
        if (termsMap.get(key)) {
            const found = termsMap.get(key).find(element => element.id === termId);
            return found.information;
        } else {
            return '';
        }
    }

    const [text, setText] = useState(getTextFromState(props.dictionary, props.recordId));

    useEffect(() => {
        const key = props.dictionaryId + style;
        if (!getTextFromState(props.dictionaryId, props.termId)) {
            fetch('https://raw.githubusercontent.com/Heorhi-Puhachou/dictionary-converter/main/generated/' + props.dictionaryId + '/' + style + '.json')
                .then(response => response.json())
                .then(jsonData => {
                    const key = props.dictionaryId + style;
                    dispatch({type: 'addTermsForStyleAndDictionary', key: key, json: jsonData});
                    const found = jsonData.find(element => element.id === props.termId);
                    setText(found.information);
                });
        }else{
            const found = termsMap.get(key).find(element => element.id === props.termId);
            setText(found.information);
        }
    }, [style]);


    const getDictionaryName = (dictionaryId) => {
        if (dictionaryId === 'a') {
            return 'Гласарый перакладчыкаў Ubuntu';
        }
        if (dictionaryId === 'b') {
            return 'Proton Terms by Košal&Turok';
        }
        if (dictionaryId === 'c') {
            return 'Test dictionary'
        }
    }

    return (<div className='dictionary-record'
                 key={props.dictionaryId}>
        <div className="dictionary-record-info">
            <div className="dictionary-text-wrapper">
                {text + '\n\n© ' + getDictionaryName(props.dictionaryId)}
            </div>
        </div>
    </div>);
}

export default DictionaryRecord;