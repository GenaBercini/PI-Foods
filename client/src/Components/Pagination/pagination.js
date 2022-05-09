import React from 'react';
import s from './pagination.module.css'

export default function Pagination({totalPost, postPerPage, handlePage, currentPage}) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
            <ul className={s.numbers}>
                {pageNumbers.map(n => (
                    <li key={n} className={currentPage === n ? s.numberActive : s.number} onClick={() => handlePage(n)}>
                        <div>{n}</div>
                    </li>
                ))}
            </ul>
    )
}