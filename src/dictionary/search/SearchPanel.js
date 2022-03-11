import React, {useState} from 'react';
import './SearchPanel.css';
import {useSelector} from "react-redux";


const replaceBelByEng = input =>{
    return input
        .toLowerCase()
        .replace('й','q')
        .replace('ц','w')
        .replace('у','e')
        .replace('к','r')
        .replace('е','t')
        .replace('н','y')
        .replace('г','u')
        .replace('ш','i')
        .replace('ў','o')
        .replace('з','p')
        .replace('х','[')
        .replace('ф','a')
        .replace('ы','s')
        .replace('в','d')
        .replace('а','f')
        .replace('п','g')
        .replace('р','h')
        .replace('о','j')
        .replace('л','k')
        .replace('д','l')
        .replace('ж',';')
        .replace('я','z')
        .replace('ч','x')
        .replace('с','c')
        .replace('м','v')
        .replace('і','b')
        .replace('т','n')
        .replace('ь','m');
};



function SearchPanel(props) {
    const [inputValue, setInputValue] = useState(props.filterValue);
    const labels = useSelector(state => state.labels);

    const checkAndChange = event=>{
        let input = event.target.value;
        input = replaceBelByEng(input);
        setInputValue(input);
        props.onFilterChange(input);
    };

  return (
    <div className="filter">
      <input type="text" onChange={checkAndChange} value={inputValue} placeholder={labels.input_eng_term} />
    </div>
  );
}

export default SearchPanel;


