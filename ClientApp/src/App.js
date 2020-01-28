import React from 'react';
import { Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import AppNavbar from './core/components/AppNavbar';
import Logout from './core/components/Logout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ResultView from './pages/ResultView/ResultView';
import MainSearch from './pages/Search/SearchResults/MainSearch/MainSearch';
import SearchResults from './pages/Search/SearchResults/SearchResults';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <AppNavbar />
      <Route exact path='/' component={MainSearch} />
      <Route exact path='/search-results' component={SearchResults} />
      <Route exact path='/record/:id' component={ResultView} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/logout' component={Logout} />
    </>
  );
};

export default App;
