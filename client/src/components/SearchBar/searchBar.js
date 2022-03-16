import React from 'react';

export default function SearchBar() {
    return (
        <div>
            <input className="search-input" type="text" placeholder="Search by name..."></input>
            <button>Search</button>
        </div>
    )
}