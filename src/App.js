import styles from './App.module.css'
import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav';
import About from './components/About';
import Detail from './components/Detail';
import { useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';


//  const backgroundUrlImage = 'https://i.redd.it/yuggvvvcy9p61.png';
//   document.body.style.backgroundImage = `url(${backgroundUrlImage})`;
//   document.body.style.backgroundAttachment = 'fixed';
//  document.body.style.backgroundPosition = 'center';



function App() {
      
   const [characters, setCharacters] = useState ([]);

   const onSearch = (id) => {
      axios(`https://rickandmortyapi.com/api/character/${id}`)
      
      .then(({ data }) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
         
      });
   }
     const onClose = (id) => {
     const charactersFiltered = characters.filter(character => 
      character.id !==Number (id))
     setCharacters(charactersFiltered)
     }  

   
   return (
      <div className = {styles.App}>
         <Nav onSearch={onSearch}/>

         <Routes>
            <Route path='/home' element ={<Cards characters=
            {characters} onClose={onClose}/>}/>
         <Route path='/about' element={<About/>}/>
         <Route path='/detail/:id' element ={<Detail/>}/>
         </Routes>
          
         
           
      </div>
   );
}

export default App;
