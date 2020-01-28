import React from 'react';
import Layout from './core/components/Layout';
import { Route } from 'react-router';
import MainSearch from './pages/Search/MainSearch';
import SearchResults from './pages/Search/SearchResults/SearchResults';
import ResultView from './pages/ResultView/ResultView';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

const App = () => {
  return (
    <Layout>
      <Route exact path='/' component={MainSearch} />
      <Route exact path='/search-results' component={SearchResults} />
      <Route exact path='/record/:id' component={ResultView} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
    </Layout>
  );
};

export default App;
