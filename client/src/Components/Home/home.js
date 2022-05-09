import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from "../SearchBar/searchBar";
import Error from '../Error/error'
import { useNavigate } from "react-router-dom";
import { filterByName, filterByScore, getRecipes, filterByDiets, getDiets} from '../../Reducer/actions';
import Logo from "../../Utils/receta.png"
import Loading from '../Loading/loading';
import Card from '../Cards/Card.js';
import Footer from '../Footer/footer';
import Pagination from '../Pagination/pagination';
import s from './home.module.css';

export default function Home() {
    let navigate = useNavigate();
    let [filter, setFilter] = useState({
        score: 'Sort by Scores',
        diet:'Sort by Diets',
        alphabetically:'Sort Alphabetically'
    })
    let recipes = useSelector((state) => state.filtered);
    let loading = useSelector((state) => state.loading);
    let dietTypes = useSelector((state) => state.diets)
    let totalPost = recipes.length;
    let dispatch = useDispatch();
    let [currentPage, setCurrentPage] = useState(1);
    let [postPerPage] = useState(8);
    const lastRecipe = currentPage * postPerPage;
    const firstRecipe = lastRecipe - postPerPage;
    const currentRecipe = recipes.slice(firstRecipe, lastRecipe);

    useEffect(() => {
        dispatch(getRecipes());
        dispatch(getDiets());
        // dispatch(getAllRecipes())
    }, [dispatch]);

    function handleLanding() {
        navigate('/');
    }

    function handleCreate() {
        navigate('/recipe/create');
    }

    function handleName(e) {
        e.preventDefault();
        dispatch(filterByName(e.target.value));
        setFilter({
            ...filter,
            alphabetically: e.target.value,
        });
        setCurrentPage(1)
    };

    function handleScore(e) {
        e.preventDefault();
        dispatch(filterByScore(e.target.value));
        setFilter({
            ...filter,
            score: e.target.value,
        });
        setCurrentPage(1)
    }

    function handleDiets(e) {
        e.preventDefault();
        dispatch(filterByDiets(e.target.value));
        setFilter({
            ...filter,
            diet: e.target.value,
        });
        setCurrentPage(1)
    }

    function handleReset(e) {
        e.preventDefault();
        dispatch(getRecipes());
        setFilter({
            score: 'Sort by Scores',
            diet: 'Sort by Diets',
            alphabetically: 'Sort Alphabetically'
        });
        setCurrentPage(1)
    }

    function handlePage(e) {
        setCurrentPage(e)
    }
    return (
        <div className={s.home}>
            <div className={s.navContainer}>
                <div className={s.navHead}>
                <img src={Logo} onClick={handleLanding} className={s.navImg} alt='logo' />
                <SearchBar setCurrentPage={setCurrentPage}/>
                </div>
                <div className={s.navFilters}>
                <button type='button' onClick={handleCreate} className={s.navBtn}>New recipe</button>
                <button type='reset' className={s.navBtn} onClick={handleReset}>Reload Filters</button>
                <select className={s.navOption} value={filter.alphabetically} onChange={handleName}>
                    <option disabled >{filter.alphabetically}</option>
                    <option value='A-Z'>A-Z</option>
                    <option value='Z-A'>Z-A</option>
                </select>
                <select className={s.navOption} value={filter.score} onChange={handleScore}>
                    <option disabled >{filter.score}</option>
                    <option value="Highest">Highest</option>
                    <option value="Lowerest">Lowerest</option>
                </select>
                <select className={s.navOption} value={filter.diet} onChange={handleDiets}>
                    <option disabled >{filter.diet}</option>
                    <option value="All">All</option>
                    {
                        dietTypes?.map(diet => {
                            return (
                                <option value={diet.name}>{diet.name}</option>
                            )
                        })
                    }
                </select>
                </div>
            </div>

            <div className='container-cards'>
                {
                    loading ? (<Loading />)
                        : recipes.length > 0 ? (
                            <div className='container'>
                                <Pagination currentPage={currentPage} postPerPage={postPerPage} totalPost={totalPost} handlePage={handlePage} />
                                <div className={s.cards}>
                                    {
                                        currentRecipe?.map((e) => {
                                            return (
                                                <Card
                                                    id={e.id}
                                                    key={e.id}
                                                    spoonacularScore={e.spoonacularScore}
                                                    title={e.title}
                                                    minutes={e.minutes}
                                                    img={e.image}
                                                    diets={e.diets}/>
                                            )
                                        })
                                    }
                                </div>
                                <Footer />
                            </div>
                        )
                            :
                            (
                                <Error message='Recipe Does Not Exist' handleReset={handleReset} error={false}/>
                            )
                }
            </div>
        </div>
    )
}