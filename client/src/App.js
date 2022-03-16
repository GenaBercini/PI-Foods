import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/landingPage';
import Home from './components/Home/home';
import CreateRecipe from './components/CreateRecipe/createRecipe';
import DetailRecipe from './components/Details/details';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage/>}/>
      <Route path="/recipe:id" element={<DetailRecipe/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/recipe/create" element={<CreateRecipe/>}/>
    </Routes>
  );
}

export default App;
