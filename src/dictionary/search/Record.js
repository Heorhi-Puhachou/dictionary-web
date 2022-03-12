import React from 'react';
import './Record.css';

export function Record(item, setSelectedItem) {
    return (
        <div className='record'

             key={item}>
            <button onClick={() => setSelectedItem(item)} className="record-info">
                <div className="text-wrapper">
                    {item}
                </div>
            </button>
        </div>
    );
}