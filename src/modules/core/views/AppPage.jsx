import React, { Component } from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { configure } from 'mobx';
import {inject, observer} from 'mobx-react';
import LazyRoute from '../components/LazyRoute';
import PcHeader from '../components/PcHeader';

import 'font-awesome/css/font-awesome.css';
import '../styles/basic.scss';

// mobx 的严格模式
configure({ enforceActions: true });

const Home = () => (
  <div>
    <h2>Home11221</h2>
  </div>
);
@inject('currentUser') @observer
export default class AppPage extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  render() {
    console.log(this.props.currentUser);
    return (
      <div>
        <PcHeader/>
        <Route exact path="/" render={({match}) => {
          return match.path === '/' ? (
            <Redirect to="/login"/>
          ) : (
            <Home/>
          )
        }}/>
        <div className="container">
          <LazyRoute name="login"/>
        </div>
      </div>
    );
  };
}