import React from "react";
import SearchBar from "../SearchBar/searchBar";
import { Link } from "react-router-dom";

export default function Home() {
    return(
        <div>
            <div>
                <SearchBar/>
                <Link to="/create"><button>New recipe</button></Link>
            </div>
        </div>
    )
}