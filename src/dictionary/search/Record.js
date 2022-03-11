import React from 'react';
import './Record.css';

export function Record(item, setSelectedItem) {
    return (
        <div className='record'

             key={item.id}>
            <button onClick={() => setSelectedItem(item.id)} className="record-info">
                <div className="text-wrapper">
                    {item.originalValue + ' - ' + item.value}
                </div>
            </button>
        </div>
    );
}