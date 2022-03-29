import { React,useState } from 'react'
import { useDispatch} from 'react-redux';
import { getRecipeByQuery } from '../../Reducer/actions';
import './searchBar.css';

export default function SearchBar() {
    let [search, setSearch] = useState('');

    let dispatch = useDispatch();

    function onChange(e){
        e.preventDefault();
        setSearch(e.target.value)
    }

    function onSubmit(e) {
        e.preventDefault();
        if(!search.length) {
            alert('Please write something')
        }
        dispatch(getRecipeByQuery(search));
        setSearch('');
    }

    return (
        <form onSubmit={onSubmit}>
            <input
            className="search-input"
            type="text" placeholder="Search by name..."
            value={search}
            onChange={onChange}></input>
            <button className='search-btn' type='submit'>Search</button>
        </form>
    )
}