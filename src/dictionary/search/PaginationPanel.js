import React from 'react';
import './PaginationPanel.css';
import {useSelector} from "react-redux";

export function PaginationPanel(props) {
  const labels = useSelector(state => state.labels);

  const pagesCount = Math.floor(props.filteredGlosses.length / props.countPerPage)
    + (props.filteredGlosses.length % props.countPerPage > 0 ? 1 : 0);

  return (
    <div className="pagination-panel">
      <div className="pagination-card">
        <button className="pagination-button"
                disabled={props.currentPage === 1}
                onClick={() => props.setCurrentPage(props.currentPage - 1)}>
          ←
        </button>
        <div className="pagination-text">
          {labels.pg + props.currentPage + labels.z + pagesCount}
        </div>
        <button className="pagination-button"
                disabled={props.currentPage === pagesCount}
                onClick={() => props.setCurrentPage(props.currentPage + 1)}>
          →
        </button>
      </div>
    </div>
  );
}