import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import stores from '../stores/appStore';
import AppPage from '../views/AppPage';
class App extends Component {
  render () {
    return (
      <Provider { ...stores }>
        <BrowserRouter basename="/">
          <AppPage/>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
