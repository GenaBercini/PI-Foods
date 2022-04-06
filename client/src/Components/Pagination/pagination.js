import React from 'react';
import './pagination.css'

export default function Pagination({totalPost, postPerPage, handlePage, currentPage}) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <div className='container'>
            <ul className='container-numbers'>
                {pageNumbers.map(n => (
                    <li key={n} className={currentPage === n ? 'number-active' : 'number'} onClick={() => handlePage(n)}>
                        <div>{n}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}