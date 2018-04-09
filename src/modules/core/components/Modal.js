import React, { Component } from 'react';
import '../styles/components/modal.scss';

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.modalStyle = this.props.styleValue || { width: '300px' };
  }
  render() {
    return (
      <div className="modal-wrapper flex-row row-center">
        <div className="modal" style={this.modalStyle}>
          {
            React.Children.map(this.props.children, (child) => {
              return child;
            })
          }
        </div>
      </div>
    );
  }
}

export class Title extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="modal-title flex-row">
        <span>{this.props.text}</span>
        <i className="fa fa-times pointer"> </i>
      </div>
    );
  }
}

export class Content extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="modal-content">
        {
          React.Children.map(this.props.children, (child) => {
            return child;
          })
        }
      </div>
    );
  }
}
export class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="modal-footer flex-row row-right">
        {
          React.Children.map(this.props.children, (child) => {
            return child;
          })
        }
      </div>
    );
  }
}