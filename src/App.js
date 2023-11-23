import './App.css';
import Navbar from './components/Navbar/Navbar'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login.tsx'
import { Route, Routes } from 'react-router-dom';
import BrowsePage from './components/Browse/BrowsePage';

function App() {

  
  return (
    <div className="page">
    
    <Navbar />
        <Routes>
            <Route path="/" Component={Main} />
            <Route path="/browse"  Component={BrowsePage} />
            <Route path="/login" Component={Login} />
            <Route path="*" Component={Main} />
        </Routes>
    <Footer />

    
</div>
  );
}

export default App;
