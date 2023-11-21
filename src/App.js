import './App.css';
import Navbar from './components/Navbar/Navbar'
import Main from './components/Main/Main'
import Browse from './components/Browse/Browse'
import Login from './components/Login/Login'
import { Route, Routes } from 'react-router-dom';

function App() {

  
  return (
    <>
    
    <Navbar />
        <Routes>
            <Route path="/" Component={Main} />
            <Route path="/browse"  Component={Browse} />
            <Route path="/login" Component={Login} />
            <Route path="*" Component={Main} />
        </Routes>

    
 </>
  );
}

export default App;
