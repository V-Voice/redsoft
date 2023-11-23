import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import checkAuth from '../../AuthChecker';
import st from './Login.module.scss'

const Login: React.FC = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUsername(user);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch('https://fakehost.ru/fakelogin', {
        credentials: 'include',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        console.log('logged in');
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (username && password) {
        localStorage.setItem('user', username);
        navigate('/');
      }
    }
  };

  if (checkAuth()) {
    return <Navigate to="/" />;
  }

  return (
    <div className={st.wrapper}>
      <h1>Авторизироваться</h1>
      <div className={st.form_wrapper}>
        <input
        required
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
        required
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

export default Login;