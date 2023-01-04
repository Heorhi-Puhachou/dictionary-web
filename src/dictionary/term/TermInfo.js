import React, {useEffect, useState} from "react";
import "./TermInfo.css"
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import DictionaryRecord from "./DictionaryRecord";

const TermInfo = (props) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const urlDictionaries = queryParams.get('dictionaries') === null ? 'abc' : queryParams.get('dictionaries');
    const storeDictionaries = useSelector(state => state.dictionaries);
    const dictionaries = storeDictionaries ? storeDictionaries : urlDictionaries;

    const labels = useSelector(state => state.labels);
    const unionMap = useSelector(state => state.unionMap);
    const term = queryParams.get('termId') === null ? null : queryParams.get('termId');
    const relations = unionMap.get(term) === null ? [] : unionMap.get(term);

    const [filteredRelations, setFilteredRelations] = useState(relations.filter(relation => dictionaries.indexOf(relation.dictionaryId) > -1));

    useEffect(() => {
        setFilteredRelations(relations.filter(relation => dictionaries.indexOf(relation.dictionaryId) > -1));
    }, [dictionaries]);

    return (
        <div className="tab-content" >
            <div className="term-stub-panel"/>
            <div className="term-info-panel">
                <div>
                    <h2 className="headertekst">{term}</h2>
                </div>
                <div className="records">
                    {filteredRelations.map((item) => <DictionaryRecord dictionaryId={item.dictionaryId} termId={item.termId}/>)}
                </div>
            </div>

            < div className="term-button-panel">
                <button className='term-back-button' onClick={() => props.resetSelectedItem()}>{labels.back}</button>
            </div>
        </div>
    );
};

export default TermInfo;