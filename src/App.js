import React, { Component } from 'react';
import Title from './components/title';
import Header from './components/header';
import Search from './components/search';
import Favorite from './components/favorite';


class App extends Component {
  render() {
    return (
      <div class="container">
        <Title />
        <Header />
        <Search />
        <Favorite />
      </div>
    );
  }
}

export default App;
