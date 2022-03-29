import './App.css';
import { Route, Routes } from "react-router-dom";
import React from 'react';
import LandingPage from './Components/LandingPage/landingPage.js';
import Home from "./Components/Home/home.js";
import Detail from './Components/Details/details.js';
import CreateRecipe from './Components/CreateRecipe/createRecipe';
import Error from './Components/Error/error.js'

function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/recipes/:id" element={<Detail/>}/>
      <Route path="/recipe/create" element={<CreateRecipe/>}/>
      <Route path="/*" element={<Error/>}/>
    </Routes>
    </div>
  );
}

export default App;
