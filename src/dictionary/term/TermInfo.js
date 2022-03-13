import React, {useEffect, useState} from "react";
import "./TermInfo.css"
import {useDispatch, useSelector} from "react-redux";
import {DictionaryRecord} from "./DictionaryRecord";
import {useLocation} from "react-router-dom";

const TermInfo = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(location.search);

    const style = useSelector(state => state.style);


    const urlDictionaries = queryParams.get('dictionaries') === null ? 'abc' : queryParams.get('dictionaries');
    const storeDictionaries = useSelector(state => state.dictionaries);
    const dictionaries = storeDictionaries ? storeDictionaries : urlDictionaries;

    const labels = useSelector(state => state.labels);
    const termsMap = useSelector(state => state.termsMap);
    const unionMap = useSelector(state => state.unionMap);
    const term = queryParams.get('termId') === null ? null : queryParams.get('termId');
    const relations = unionMap.get(term) === null ? [] : unionMap.get(term);

    const [filteredRelations, setFilteredRelations] = useState(relations.filter(relation => dictionaries.indexOf(relation.dictionaryId) > -1));

    useEffect(() => {
        setFilteredRelations(relations.filter(relation => dictionaries.indexOf(relation.dictionaryId) > -1));
    }, [dictionaries]);

    useEffect(() => {
        filteredRelations.forEach(relation => getText(relation.dictionaryId, relation.termId, style));
    }, []);


    const getText = (dictionaryId, termId, style) => {
        const key = dictionaryId + style;
        if (termsMap.get(key)) {
            const found = termsMap.get(key).find(element => element.id === termId);
            return found.information;
        } else {
            fetch('https://raw.githubusercontent.com/Heorhi-Puhachou/dictionary-converter/main/generated/' + dictionaryId + '/' + style + '.json')
                .then(response => response.json())
                .then(jsonData => {
                    dispatch({type: 'addTermsForStyleAndDictionary', key: key, json: jsonData});
                    const found = jsonData.find(element => element.id === termId);
                    setFilteredRelations(relations.filter(relation => dictionaries.indexOf(relation.dictionaryId) > -1));
                    return found.information;
                });
        }
    }


    return (
        <div className="tab-content">
            <div className="term-stub-panel"/>
            <div className="term-info-panel">
                <div>
                    <h2 className="headertekst">{term}</h2>
                </div>
                <div className="records">
                    {filteredRelations.map((item) => DictionaryRecord(item.dictionaryId, item.termId, getText(item.dictionaryId, item.termId, style)))}
                </div>
            </div>


            < div className="term-button-panel">
                <button className='term-back-button' onClick={() => props.resetSelectedItem()}>{labels.back}</button>
            </div>
        </div>
    );
};

export default TermInfo;