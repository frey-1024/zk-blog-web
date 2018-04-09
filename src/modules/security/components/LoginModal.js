import React, { Component } from 'react';
import { Modal, Title, Content, Footer } from '../../core/components/Modal';

export default class LoginModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal styleValue={{width: '500px'}}>
        <Title text='登录'/>
        <Content>
          <div className="form-group">
            <label className="form-label">用户昵称</label>
            <input type="text" className="form-control" placeholder="用户昵称"/>
          </div>
          <div className="form-group">
            <label className="form-label">邮箱</label>
            <input type="email" className="form-control" placeholder="邮箱"/>
          </div>
          <div className="form-group mb0">
            <label className="form-label">密码</label>
            <input type="password" className="form-control" placeholder="密码"/>
          </div>
        </Content>
        <Footer>
          <button className="btn btn-blue">登录</button>
        </Footer>
      </Modal>
    );
  }
}