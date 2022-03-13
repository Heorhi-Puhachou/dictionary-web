import React, {useEffect, useState} from 'react';
import './Dictionary.css';
import {useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import SearchList from "./search/SearcList";
import TermInfo from "./term/TermInfo";
import Preloader from "../base/Preloader";


function Dictionary() {

    const dictionaries = useSelector(state => state.dictionaries);
    const terms = useSelector(state => state.terms);
    const unionMap = useSelector(state => state.unionMap);
    const dispatch = useDispatch();


    const countPerPage = 5;
    const [filteredTerms, setFilteredTerms] = useState([]);


    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(terms === undefined || terms.length === 0);

    const queryParams = new URLSearchParams(location.search);
    const filter = queryParams.get('filter') === null ? '' : queryParams.get('filter');
    const page = queryParams.get('page') === null ? 1 : +queryParams.get('page');
    const termId = queryParams.get('termId') === null ? null : +queryParams.get('termId');

    const [currentPage, setCurrentPage] = useState(page);
    const [filterValue, setFilterValue] = useState(filter);
    const [selectedItemId, setSelectedItemId] = useState(termId);

    const stopLoading = () => {
        setLoading(false);
    };

    const filterTerms = (allTerms) => {
        let filtered = [];
        for (const [key, value] of Object.entries(allTerms)) {
            console.log(key, value);
            if(hasDictionary(value, dictionaries)){
                filtered.push(key);
            }
        }
        return filtered;
    };

    const hasDictionary = (array, dictionaryIds) => {
        for (let index = 0; index < array.length; index++) {
            if (dictionaryIds.indexOf(array[index].dictionaryId)>-1) {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        if (loading) {
            fetch('https://raw.githubusercontent.com/Heorhi-Puhachou/dictionary-converter/main/generated/union.json')
                .then(response => response.json())
                .then(jsonData => {
                    dispatch({type: 'addUnionMap', unionMap: jsonData});
                    setFilteredTerms(filterTerms(jsonData));
                    setTimeout(stopLoading, 500);
                });
        } else {
            setFilteredTerms(filterTerms(terms));
            setTimeout(stopLoading, 500);
        }
    }, []);



    useEffect(() => {
        filterGlosses(filterValue);
    }, [terms]);

    useEffect(() => {
        filterGlosses(filterValue);
    }, [dictionaries]);

    const updatePage = (page) => {
        setCurrentPage(page);
        navigate(`${location.pathname}?filter=${filterValue}&page=${page}&dictionaries=${dictionaries}`);
    };

    const resetCurrentPage = () => {
        updatePage(1);
    };

    const filterGlosses = filterValue => {
        let filtered = [];
        if (unionMap) {
            for (let [key, value] of unionMap) {
                const fil = key.toLowerCase().includes(filterValue.toLowerCase());
                const dic = hasDictionary(value, dictionaries);
                if (fil && dic) {
                    filtered.push(key);
                }
            }
        }
        setFilteredTerms(filtered);
    };

    const onFilterChange = value => {
        filterGlosses(value);
        resetCurrentPage();
        setFilterValue(value);
        navigate(`${location.pathname}?filter=${value}&page=1&dictionaries=${dictionaries}`);
    };

    const resetSelectedItem = () => {
        setSelectedItemId(null);
        navigate(`${location.pathname}?filter=${filter}&page=${page}&dictionaries=${dictionaries}`);
    };

    const onItemSelect = (id) => {
        setSelectedItemId(id);
        navigate(`${location.pathname}?termId=${id}&dictionaries=${dictionaries}`);
    };

    if (loading) {
        return <Preloader/>;
    }
    if (selectedItemId === null) {
        return <SearchList onFilterChange={onFilterChange}
                           filterValue={filterValue}
                           setSelectedItemId={onItemSelect}
                           filteredTerms={filteredTerms}
                           countPerPage={countPerPage}
                           currentPage={currentPage}
                           updatePage={updatePage}/>
    } else {
        return <TermInfo
            termId={selectedItemId}
            resetSelectedItem={resetSelectedItem}/>;
    }
}

export default Dictionary;