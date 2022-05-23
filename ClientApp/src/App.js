import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import './custom.css'

export const App = () => {
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