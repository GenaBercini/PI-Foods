import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from "../SearchBar/searchBar";
import { useNavigate } from "react-router-dom";
import { filterByName, filterByScore, getRecipes, filterByDiets } from '../../Reducer/actions';
import Logo from "../../Utils/receta.png"
import notFounded from "../../Utils/notfounded.png";
import Loading from '../Loading/loading';
import Card from '../Cards/Card.js';
import Footer from '../Footer/footer';
import Pagination from '../Pagination/pagination';
import './home.css';

export default function Home() {
    let navigate = useNavigate();
    let recipes = useSelector((state) => state.filtered);
    let loading = useSelector((state) => state.loading);
    let totalPost = recipes.length;
    let [order, setOrder] = useState('');
    let dispatch = useDispatch();
    //---------------------Pagination-------------------------------//
    let [currentPage, setCurrentPage] = useState(1);
    let [postPerPage] = useState(4);
    const lastRecipe = currentPage * postPerPage;
    const firstRecipe = lastRecipe - postPerPage;
    const currentRecipe = recipes.slice(firstRecipe, lastRecipe);

    useEffect(() => {
        dispatch(getRecipes());
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
        setOrder(e.target.value)
    };

    function handleScore(e) {
        e.preventDefault();
        dispatch(filterByScore(e.target.value));
        setOrder(e.target.value)
    }

    function handleDiets(e) {
        e.preventDefault();
        dispatch(filterByDiets(e.target.value));
        setOrder(e.target.value)
    }

    function handleReset(e) {
        e.preventDefault();
        dispatch(getRecipes());
        setOrder(e.target.value);
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
                <select defaultValue='default' onChange={handleName}>
                    <option disabled value='default'>Sort Alphabetically</option>
                    <option value='ASC'>A-Z</option>
                    <option value='DESC'>Z-A</option>
                </select>
                <select defaultValue='default' onChange={handleScore}>
                    <option disabled value='default'>Sort by Scores</option>
                    <option value="HIGH">Highest</option>
                    <option value="LOWER">Lowerest</option>
                </select>
                <select defaultValue='default' onChange={handleDiets}>
                    <option disabled value='default'>Sort by Diets</option>
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
                <SearchBar />
            </div>

            <div className='container-cards'>
                {
                    loading ? (<Loading />)
                        : recipes.length > 0 ? (
                            <div className='container'>
                                <Pagination postPerPage={postPerPage} totalPost={totalPost} handlePage={handlePage} />
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
                                                    diets={e.diets} />
                                            )
                                        })
                                    }
                                </div>
                                <Footer />
                            </div>
                        )
                            :
                            (
                                <div className='error-recipe'>
                                    <img src={notFounded} alt='notFound' />
                                    <p>Recipe Does Not Exist</p>
                                </div>
                            )
                }
            </div>
        </div>
    )
}