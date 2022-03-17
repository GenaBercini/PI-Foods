import { React,useState } from 'react'
import { useDispatch} from 'react-redux';
import { getRecipeByQuery } from '../../Reducer/actions';

export default function SearchBar() {
    let [search, setSearch] = useState('');

    let dispatch = useDispatch();

    function onChange(e){
        e.preventDefault();
        setSearch(e.target.value)
    }

    function onSubmit(e) {
        e.preventDefault();
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
            <button type='submit'>Search</button>
        </form>
    )
}