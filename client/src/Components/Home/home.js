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
import './home.css';

export default function Home() {
    let navigate = useNavigate();
    let [filter, setFilter] = useState({
        score: 'Sort by Scores',
        diet:'Sort by Diets',
        alphabetically:'Sort Alphabetically'
    })
    let recipes = useSelector((state) => state.filtered);
    let loading = useSelector((state) => state.loading);
    let totalPost = recipes.length;
    let dispatch = useDispatch();
    let [currentPage, setCurrentPage] = useState(1);
    let [postPerPage] = useState(9);
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
        <div>
            <div className='search-filter'>
                <img src={Logo} onClick={handleLanding} className='img-search' alt='logo' />
                <button type='reset' className='btn' onClick={handleReset}>Reload</button>
                <button type='button' onClick={handleCreate} className='btn-recipe btn'>New recipe</button>
                <select value={filter.alphabetically} onChange={handleName}>
                    <option disabled >{filter.alphabetically}</option>
                    <option value='A-Z'>A-Z</option>
                    <option value='Z-A'>Z-A</option>
                </select>
                <select value={filter.score} onChange={handleScore}>
                    <option disabled >{filter.score}</option>
                    <option value="Highest">Highest</option>
                    <option value="Lowerest">Lowerest</option>
                </select>
                <select value={filter.diet} onChange={handleDiets}>
                    <option disabled >{filter.diet}</option>
                    <option value="All">All</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="dairy free">Dairy Free</option>
                    <option value="vegan">Vegan</option>
                    <option value="lacto ovo vegetarian">Lacto-Ovo Vegetarian</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="fodmap friendly">Low FODMAP</option>
                    <option value="whole 30">Whole30</option>
                    <option value="Ketogenic">Ketogenic</option>
                </select>
                <SearchBar setCurrentPage={setCurrentPage}/>
            </div>

            <div className='container-cards'>
                {
                    loading ? (<Loading />)
                        : recipes.length > 0 ? (
                            <div className='container'>
                                <Pagination currentPage={currentPage} postPerPage={postPerPage} totalPost={totalPost} handlePage={handlePage} />
                                <div className='cards'>
                                    {
                                        currentRecipe?.map((e) => {
                                            return (
                                                <Card
                                                    id={e.id}
                                                    key={e.id}
                                                    spoonacularScore={e.spoonacularScore}
                                                    title={e.title}
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
                                <Error message='Recipe Does Not Exist'/>
                            )
                }
            </div>
        </div>
    )
}