import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Context } from './context/Context';

const App = () => {
  const { token, dispatch } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const publicRoutes = ['/login', '/register'];

  useEffect(() => {
    if (!token && !publicRoutes.includes(location.pathname)) {
      navigate('/login');
    }
  }, [token, navigate, location.pathname]);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={!!token} handleLogout={handleLogout} />
      <main className="flex-grow pt-20 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
