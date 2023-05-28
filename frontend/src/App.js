import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AllRoutes from './Routes/AllRoutes';
import { useContext, useState } from 'react';
import NewNavbar from './components/AfterLogin/NewNavbar';
import { AuthContext } from './Context/AuthContext';

function App() {
  const {isAuth, loginUser} = useContext(AuthContext);
  
  return (
    <div>
      <AllRoutes/>
    </div>
  );
}

export default App;
