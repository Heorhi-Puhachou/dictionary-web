import React, {useEffect, useState} from 'react';
import './DictionaryRecord.css';
import {useDispatch, useSelector} from "react-redux";

const DictionaryRecord = props => {

    const labels = useSelector(state => state.labels);
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
        } else {
            const found = termsMap.get(key).find(element => element.id === props.termId);
            setText(found.information);
        }
    }, [style]);


    const getDictionaryName = (dictionaryId) => {
        if (dictionaryId === 'a') {
            return labels.a_dictionary;
        }
        if (dictionaryId === 'b') {
            return labels.b_dictionary;
        }
        if (dictionaryId === 'c') {
            return labels.c_dictionary;
        }
        if (dictionaryId === 'd') {
            return labels.d_dictionary;
        }
        if (dictionaryId === 'e') {
            return labels.e_dictionary;
        }
    }
    if (props.dictionaryId === 'd') {
        return (
            <div className='dictionary-record' key={props.dictionaryId}>
                <div className="dictionary-record-info">
                    <div className="dictionary-text-wrapper" key='text'>
                        {text + '\n\n'}
                    </div>
                    <div className="dictionary-text-wrapper" key='color' style={text?{backgroundColor: text.substr(text.length - 7)}:{}}>
                        {'\n\n'}
                    </div>
                    <div className="dictionary-text-wrapper" key='dictionary'>
                        {'\n\n© ' + getDictionaryName(props.dictionaryId)}
                    </div>
                </div>
            </div>);
    } else {
        return (
            <div className='dictionary-record' key={props.dictionaryId}>
                <div className="dictionary-record-info">
                    <div className="dictionary-text-wrapper">
                        {text + '\n\n© ' + getDictionaryName(props.dictionaryId)}
                    </div>
                </div>
            </div>);
    }
}

export default DictionaryRecord;