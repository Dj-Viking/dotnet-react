import React from 'react';
import { Route } from 'react-router';
// @ts-ignore
import Layout from './components/Layout/Layout.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './views/Home/Home';
// @ts-ignore
import { Weather } from './views/Weather/Weather.tsx';
// @ts-ignore
import Counter from './components/Counter/Counter.tsx';
import './custom.css'

const App: React.FC<{}> = () => {
  //@ts-ignore
  const devapi = "/";
  return (
    <BrowserRouter basename={devapi}>
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/weather-data' component={Weather} />
      </Layout>
    </BrowserRouter>
  );
}


export default App;