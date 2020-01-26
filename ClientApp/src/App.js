import React from 'react';
import Layout from './core/components/main/Layout';
import { Route } from 'react-router';
import MainSearch from './pages/Search/MainSearch';
import SearchResults from './pages/Search/SearchResults';

const App = () => {
  return (
    <Layout>
      <Route exact path='/' component={MainSearch} />
      <Route exact path='/search-results' component={SearchResults} />
    </Layout>
  );
};

export default App;
