import React from "react";
import SearchBar from "../SearchBar/searchBar";
import { Link } from "react-router-dom";
import Cards from "../Cards/Cards";

export default function Home() {
    return(
        <div>
            <div>
                <SearchBar/>
                <Link to="/create"><button>New recipe</button></Link>
                <Cards />
            </div>
        </div>
    )
}