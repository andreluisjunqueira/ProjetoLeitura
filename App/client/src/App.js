
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './components/HomeScreen';
import Categories from './components/CategoriesScreen';
import PostDetail from './components/PostDetailScreen';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <div className="container" >
        <div className='section'>
          <nav>
            <div className="nav-wrapper" style={{backgroundColor:'#2196F3',paddingLeft : 10, paddingRight : 10}}>
              <a href="#" className="brand-logo">Leitura</a>
              <Login/>
            </div>
          </nav>
          <BrowserRouter>
            <div>
              <Route exact path='/' component={Home}/> 
              <Route exact path='/:category' component={Categories}/> 
              <Route path='/:category/:id' component={PostDetail}/> 
            </div>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}
export default App;
