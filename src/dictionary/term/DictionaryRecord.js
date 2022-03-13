import React from 'react';
import './DictionaryRecord.css';

export function DictionaryRecord(dictionary, recordId, text) {
    return (<div className='dictionary-record'
                 key={recordId}>
        <button className="dictionary-record-info">
            <div className="dictionary-text-wrapper">
                {text + '\n© '+dictionary}
            </div>
        </button>
    </div>);
}