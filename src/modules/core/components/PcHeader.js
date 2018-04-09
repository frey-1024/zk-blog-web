import React, { Component } from 'react';
import '../styles/components/pcHeader.scss';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="pc-header flex-row row-center">
        <ul className="pc-nav container">
          <li>推荐</li>
          <li>随笔</li>
          <li>生活</li>
          <li>我的</li>
          <li>搜索</li>
        </ul>
      </div>
    );
  }
}