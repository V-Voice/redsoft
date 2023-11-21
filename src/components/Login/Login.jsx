import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'
import { Navigate } from 'react-router-dom';
import checkAuth from '../../AuthChecker';


export default function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUsername(user);
    }
  }, []);

  const handleLogin = () => {
    if (username && password) {
      localStorage.setItem('user', username);
      navigate('/')
    }
  };


  if (checkAuth()) {
    return <Navigate to="/" />
  }
  return (
    
    <div className="main">
        <div>
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Войти</button>
        </div>
     
    </div>
    
  );
};

