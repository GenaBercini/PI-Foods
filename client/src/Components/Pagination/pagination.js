import React from 'react';
import './pagination.css'

export default function Pagination({totalPost, postPerPage, handlePage}) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <div className='container'>
            <ul className='container-numbers'>
                {pageNumbers.map(n => (
                    <li key={n} className='number' onClick={() => handlePage(n)}>
                        <div>{n}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}