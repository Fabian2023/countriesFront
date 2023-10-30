import React from 'react';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Card from './Components/Card/Card';
import DetailCountries from './Components/Detail/DetailCountries';
import CreateActivity from './Components/CreateActivity/CreateActivity';
import ActivityCountry from './Components/ActivityFilter/ActivityCountry';

function App() {
 
  

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Card />} />
        <Route path='/home/detail/:idPais' element={<DetailCountries/>} />
        <Route path='/home/activities' element={<CreateActivity/>} />
        <Route path="/home/actifilter" element={<ActivityCountry />} />
      </Routes>
    </div>
  );
}

export default App;
