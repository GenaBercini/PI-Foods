import { React,useState } from 'react'
import { useDispatch } from 'react-redux';
import { getRecipes } from '../../Reducer/actions';
import searchImg from '../../Utils/lupa.png'
import s from './searchBar.module.css';

export default function SearchBar({setCurrentPage}) {
    let [search, setSearch] = useState('');

    let dispatch = useDispatch();

    function onChange(e){
        e.preventDefault();
    /^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value.trim()) && setSearch(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        if(!search.length) {
            alert('Please write something')
        }
        dispatch(getRecipes(search));
        setCurrentPage(1);
        setSearch('');
    }

    return (
        <form className={s.searchContainer} onSubmit={onSubmit}>
            <input
            className={s.searchInput}
            type="text" placeholder="Search.."
            value={search}
            onChange={onChange}></input>
            <button className={s.searchBtn} type='submit'><img src={searchImg} alt='searchimg'/></button>
        </form>
    )
}