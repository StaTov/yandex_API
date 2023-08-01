import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import EmptyPage from './components/EmptyPage';
import './App.css';
import NavBar from './components/NavBar';


function App() {


  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/empty' element={<EmptyPage />} />
        <Route path='*' element={<Auth />} />
        <Route path='/api' element={< NavBar />} >
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
