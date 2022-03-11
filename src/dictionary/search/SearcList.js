import SearchPanel from "./SearchPanel";
import {RecordsBlock} from "./RecordsBlock";
import {PaginationPanel} from "./PaginationPanel";
import React from "react";

const SearchList = (props)=>{
    return <div className="tab-content">
        <SearchPanel onFilterChange={props.onFilterChange}
                     filterValue={props.filterValue}/>
        <RecordsBlock filteredGlosses={props.filteredTerms}
                      countPerPage={props.countPerPage}
                      currentPage={props.currentPage}
                      setSelectedItemId={props.setSelectedItemId}/>
        <PaginationPanel filteredGlosses={props.filteredTerms}
                         countPerPage={props.countPerPage}
                         currentPage={props.currentPage}
                         setCurrentPage={props.updatePage}/>
    </div>;
};

export default SearchList;