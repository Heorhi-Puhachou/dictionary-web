import React from 'react';
import './DictionaryRecord.css';

export function DictionaryRecord(dictionary, recordId, text) {

    const getDictionaryName = (dictionaryId) => {
        if(dictionaryId==='a'){
            return 'Гласарый перакладчыкаў Ubuntu';
        }
        if(dictionaryId==='b'){
            return 'Proton Terms by Košal&Turok';
        }
        if(dictionaryId==='c'){
            return 'Test dictionary'
        }
    }

    return (<div className='dictionary-record'
                 key={recordId}>
        <div className="dictionary-record-info">
            <div className="dictionary-text-wrapper">
                {text + '\n\n© '+getDictionaryName(dictionary)}
            </div>
        </div>
    </div>);
}