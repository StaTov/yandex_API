import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import EmptyPage from './components/EmptyPage';
import './App.css';
import { useState } from 'react';
import Nav from './components/Nav';
import DiskApi from './components/DiskApi';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { yandexInit } from './utils/helper';


function App() {

  const [token, setToken] = useState(null);
  console.log(1);
  useEffect(() => {
    console.log(2);
    if (!token) {
      yandexInit(setToken)
      setToken(localStorage.getItem('access_token'))
      console.log(3);
    }
  }, [setToken, token])

  return (
    <Routes>
      <Route path='/' element={<Nav setToken={setToken} token={token} />} >
        <Route path='/' element={
          !token
            ? <Auth />
            : <DiskApi />
        } />
        <Route path='/empty' element={<EmptyPage />} />
        <Route path='*' element={<Navigate to='/' replace={true} />} />
      </Route>
    </Routes >
  );
}

export default App;
