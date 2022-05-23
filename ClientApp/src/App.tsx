import React from 'react';
import { Route } from 'react-router';
// @ts-ignore
import Layout from './components/Layout.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './components/Home';
// @ts-ignore
import { FetchData } from './components/FetchData.tsx';
import { Counter } from './components/Counter';

import './custom.css'

const App = () => {
  const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
  return (
    <BrowserRouter basename={baseUrl}>
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    </BrowserRouter>
  );
}


export default App;