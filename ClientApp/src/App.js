import React from 'react';
import Layout from './core/components/Layout';
import { Route } from 'react-router';
import MainSearch from './pages/MainSearch';

const App = () => {
  return (
    <Layout>
      <Route path='/main-search' component={MainSearch} />
    </Layout>
  );
};

export default App;
