import React, { Component } from 'react';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
//import 'bootstrap/dist/css/bootstrap.css'; 
import 'bootstrap/scss/bootstrap.scss';
import 'common.css';
import 'react-toastify/dist/ReactToastify.css';
import ScrollMemory from 'react-router-scroll-memory';

import MainRoute from "./views";


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <ScrollMemory />
          <Router history={this.props.history}>
            <Route path='/' component={MainRoute} />
          </Router>
        </BrowserRouter>
        <ToastContainer />
      </div>
    );
  }
}

export default App;