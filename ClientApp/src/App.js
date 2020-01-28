import React, { useState, useEffect } from 'react';
import { Route } from 'react-router';
import MainSearch from './pages/Search/MainSearch';
import SearchResults from './pages/Search/SearchResults/SearchResults';
import ResultView from './pages/ResultView/ResultView';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import auth from './core/services/authService';
import { ToastContainer } from 'react-toastify';
import AppNavbar from './core/components/AppNavbar';

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
  }, []);

  return (
    <>
      <ToastContainer />
      <AppNavbar user={user} />
      <Route exact path='/' component={MainSearch} />
      <Route exact path='/search-results' component={SearchResults} />
      <Route exact path='/record/:id' component={ResultView} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
    </>
  );
};

export default App;
