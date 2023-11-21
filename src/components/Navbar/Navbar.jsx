import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router'


export default function Navbar() {
  let navigate = useNavigate();
  let location = useLocation()
  const [loggedIn, setLoggedIn] = useState(null);


  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
    navigate('/')
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
    <div className="navbar">
      <Link to="/">Главная</Link>
      <Link to="/browse">Просмотр</Link>
      {loggedIn ? (
        <Link to="/" onClick={handleLogout}>Выйти</Link>
      ) : (
        <Link to="/login">Авторизироваться</Link>
      )}
    </div>
  );
}