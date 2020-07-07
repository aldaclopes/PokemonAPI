import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Loja from './pages/Loja';
import Home from './pages/Home';
export default function Routes() {
    return ( 
<BrowserRouter>
    <Switch>
        <Route path = '/' exact component = { Home }/> 
        <Route path = '/Loja' component = { Loja }/> 
    </Switch> 
</BrowserRouter>
    );
}