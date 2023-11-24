import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router'
import st from './Navbar.module.scss'
const logo =  require('../../logo.png')



const Navbar: React.FC = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [location]);

  return (
    <header className={st.header}>
    <div className={st.navbar}>
      <div className={st.logo}>
    <Link to={"/"} className={st.logo}>
          <div className={st.logo}>
           <img src={String(logo)} alt="logo" height="50px"/>
          </div>
        </Link>
    </div>
        <nav>
      <Link to="/"><button>Главная</button></Link>
      <Link to="/browse"><button>Просмотр</button></Link>
      {loggedIn ? (
        <Link to="/" onClick={handleLogout}>
          <button>Выйти</button>
        </Link>
      ) : (
        <Link to="/login"><button>Авторизироваться</button></Link>
      )}
      </nav>
    </div>
    </header>
  );
};

export default Navbar;