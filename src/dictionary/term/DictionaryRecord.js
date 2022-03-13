import React from 'react';
import './DictionaryRecord.css';

export function DictionaryRecord(dictionary, recordId, text) {
    return (<div className='record'
                 key={recordId}>
        <button className="record-info">
            <div className="text-wrapper">
                {text + '\n© '+dictionary}
            </div>
        </button>
    </div>);
}