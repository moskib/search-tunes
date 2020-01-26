import React from 'react';
import Layout from './components/core/Layout';
import { Route } from 'react-router';
import MainSearch from './components/pages/MainSearch';

const App = () => {
  return (
    <Layout>
      <Route path='/main-search' component={MainSearch} />
    </Layout>
  );
};

export default App;
