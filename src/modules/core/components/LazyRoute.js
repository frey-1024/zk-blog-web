import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom';
import routers from '../routers/routerParams';

export default class LazyRoute extends Component {
  constructor(props) {
    super(props);
    this.router = this.findRouteParam(routers, this.props.name, this.props.name.split('.'), 0);
  }
  /**
   * 根据路由名找到相应的参数
   * @param params 路由数组
   * @param name 路由名
   * @param relation 关系数组
   * @param level 层次级别
   * @returns {*}
   */
  findRouteParam(params, name, relation, level) {
    for (let param, i = 0, l = params.length; i < l; i++) {
      param = params[i];
      // 路由名相等
      if (param.name === name) {
        return param;
      }
      // 查询层级
      if (param.name === relation[level]) {
        return this.findRouteParam(param.children, name, relation, level++);
      }
    }
  }
  render() {
    return (
      <Route path={this.router.path} component={this.router.component}/>
    );
  }
};