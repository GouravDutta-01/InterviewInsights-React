import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Context } from '../context/Context';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-md">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="text-lg font-bold text-indigo-600 -m-1.5 p-1.5">
            InterviewInsights
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">Dashboard</Link>
          <Link to="/schedule" className="text-sm font-semibold leading-6 text-gray-900">Add Interview Experience</Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {token ? (
            <button onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900">
              Logout <span aria-hidden="true">→</span>
            </button>
          ) : (
            <div className="flex gap-x-4">
              <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">Login</Link>
              <Link to="/register" className="text-sm font-semibold leading-6 text-gray-900">Register</Link>
            </div>
          )}
        </div>
      </nav>
      {isOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50"></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-lg font-bold text-indigo-900 -m-1.5 p-1.5">
                InterviewInsights
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link to="/dashboard" onClick={closeMenu} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Dashboard</Link>
                  <Link to="/schedule" onClick={closeMenu} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Add Interview Experience</Link>
                </div>
                <div className="py-6">
                  {token ? (
                    <button onClick={handleLogout} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Logout
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <Link to="/login" onClick={closeMenu} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Login</Link>
                      <Link to="/register" onClick={closeMenu} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Register</Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
