import React, {useEffect, useState} from 'react';
import './Dictionary.css';
import {useLocation, useNavigate} from 'react-router-dom';
import {LACINK_TAG, NARKAM_TAG, TARASK_TAG} from "../base/constant";
import {useDispatch, useSelector} from "react-redux";
import SearchList from "./search/SearcList";
import TermInfo from "./term/TermInfo";
import Preloader from "../base/Preloader";


function Dictionary() {

    const style = useSelector(state => state.style);
    const terms = useSelector(state => state.terms);
    const dispatch = useDispatch();


    const countPerPage = 4;
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

    const getTermUrl = tag => {
        return 'https://raw.githubusercontent.com/Heorhi-Puhachou/excel_json_parser/main/generated/glossary/' + tag + '.json';
    };

    useEffect(() => {
        if (loading) {
            const termsMap = new Map();
            fetch(getTermUrl(NARKAM_TAG))
                .then(response => response.json())
                .then(jsonData => {
                    termsMap.set(NARKAM_TAG, jsonData);
                    fetch(getTermUrl(LACINK_TAG))
                        .then(response => response.json())
                        .then(jsonData => {
                            termsMap.set(LACINK_TAG, jsonData);
                            fetch(getTermUrl(TARASK_TAG))
                                .then(response => response.json())
                                .then(jsonData => {
                                    termsMap.set(TARASK_TAG, jsonData);
                                    dispatch({type: 'addT', termsMap: termsMap});
                                    setFilteredTerms(termsMap.get(style)[0]);
                                    setTimeout(stopLoading, 500);
                                });
                        });
                });

        } else {
            setFilteredTerms(terms);
            setTimeout(stopLoading, 500);
        }

    }, []);


    useEffect(() => {
        filterGlosses(filterValue);
    }, [terms]);

    const updatePage = (page) => {
        setCurrentPage(page);
        navigate(`${location.pathname}?filter=${filterValue}&page=${page}`);
    };

    const resetCurrentPage = () => {
        updatePage(1);
    };

    const filterGlosses = value => {
        setFilteredTerms(
            terms.filter(
                item => item.originalValue.toLowerCase().includes(value.toLowerCase())));
    };

    const onFilterChange = value => {
        filterGlosses(value);
        resetCurrentPage();
        setFilterValue(value);
        navigate(`${location.pathname}?filter=${value}&page=1`);
    };

    const resetSelectedItem = () => {
        setSelectedItemId(null);
        navigate(`${location.pathname}?filter=${filter}&page=${page}`);
    };

    const onItemSelect = (id) => {
        setSelectedItemId(id);
        navigate(`${location.pathname}?termId=${id}`);
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