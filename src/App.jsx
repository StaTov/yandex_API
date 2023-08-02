import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import EmptyPage from './components/EmptyPage';
import './App.css';
import NavBar from './components/NavBar';
import { useState } from 'react';


function App() {
  
  const [token, setToken] = useState(null);

  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<Auth token={token} setToken={setToken}/>} />
        <Route path='/empty' element={<EmptyPage />} />
        <Route path='*' element={<Auth />} />
        <Route path='/api' element={< NavBar token={token} setToken={setToken}/>} >
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
