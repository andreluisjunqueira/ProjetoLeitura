
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './components/HomeScreen';
import Categories from './components/CategoriesScreen';
import PostDetail from './components/PostDetailScreen';

class App extends Component {
  render() {
    return (
      <div className="container" >
        <div className='section'>
        <nav>
          <div className="nav-wrapper" style={{backgroundColor:'#2196F3'}}>
            <a href="#" className="brand-logo">Leitura</a>
          </div>
        </nav>
        <BrowserRouter>
          <div>
            <Route exact path='/' component={Home}/> 
            <Route path='/categories/:category' component={Categories}/> 
            <Route path='/post/:id' component={PostDetail}/> 
          </div>
        </BrowserRouter>
        </div>
      </div>
    );
  }cd 
}
export default App;
