import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage/landingPage';
import Home from './Components/Home/home';
import CreateRecipe from './Components/CreateRecipe/createRecipe';
import DetailRecipe from './Components/Details/details';
import { Provider } from 'react-redux';
import Error from './Components/Error/error.js'
import store from './Store';

function App() {
  return (
    <Provider store={store}>
    <Routes>
      <Route exact path="/" element={<LandingPage/>}/>
      <Route path="/recipes/:id" element={<DetailRecipe/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/recipe/create" element={<CreateRecipe/>}/>
      <Route path="/*" element={<Error/>}/>
    </Routes>
    </Provider>
  );
}

export default App;
