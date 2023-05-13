import style from './App.module.css'
import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';





//  const backgroundUrlImage = 'https://i.redd.it/yuggvvvcy9p61.png';
//  document.body.style.backgroundImage = `url(${backgroundUrlImage})`;
//    document.body.style.backgroundAttachment = 'fixed';
//   document.body.style.backgroundPosition = 'center';



function App() {
      
  let [ characters, setCharacters ] = useState([])

  const [ access, setAccess] = useState(false);
  const EMAIL = 'daniel@gmail.com';
  const PASSWORD = "1234dani"

  const { pathname } = useLocation();
  const navigate = useNavigate();

 function onSearch(id) {
  axios(`http://localhost:3001/rickandmorty/character/${id}`)
  .then( ({ data }) => {
    const char = characters?.find(e => e.id === data.id)
    if (char){
      alert("Already in the list") 
    } 
    else if(data.id !== undefined) {
      setCharacters(characters => [...characters, data]);
    }
  
    else {
      alert('Character not found');
    }
  })
}


function login(userData) {
  const { email, password } = userData;
  const URL = 'http://localhost:3001/rickandmorty/login/';
  axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
     const { access } = data;
     setAccess(data);
     access && navigate('/home');
  });
}

 useEffect(()=> {
  !access && navigate('/')
}, [access])

const onClose = (id) => {
  setCharacters(
    characters.filter((character) => character.id !== Number(id))
  )
}
  return (
    <div className = {style.App}>
        
          { pathname !== '/' && 
            <Nav 
              onSearch = {onSearch}
              setAccess ={setAccess}
            /> }
        
        <Routes>

          <Route path='/'  element= {<Form login= {login} />}/>

          <Route  path="/home" element={<Cards characters= {characters} onClose = {onClose}/> }/>

          <Route  path="/about" element={<About/>}/>

          <Route  path='/detail/:id' element={<Detail/>}/>

          <Route path='/favorites' element={<Favorites/>}/>

        </Routes>
    </div>
  )
}


export default App;
