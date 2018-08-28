import {getStyle} from './get';

/**
 * 单例模式 + 观察订阅模式
 */
class Resize {
  constructor() {
    this.listeners = [];
    this.instance = null;
  };
  static getInstance() { // 单例模式
    return this.instance || (this.instance = new Resize());
  };
  _findPrevListener(el) {
    const l = this.listeners.length;
    for (let i = 0, listener; i < l; i++) {
      listener = this.listeners[i];
      if (listener && listener.el === el) {
        return { listener, index: i };
      }
    }
    return { listener: null, index: null };
  };
  _handleResize(ev) {
    const el = ev.target._parentNode_;
    const { listener } = this._findPrevListener(el);
    if (listener) {
      const handlers = listener.handlers;
      if (handlers) {
        const size = handlers.length;
        for (let i = 0, h, handler, context; i < size; i++) {
          h = handlers[i];
          handler = h.handler;
          context = h.context;
          handler.apply(context, [el]);
        }
      }
    }
  }
  _createResizeListener(el) {
    const self = this;
    const obj = document.createElement('object');
    obj.setAttribute('style',
      'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden;opacity: 0; pointer-events: none; z-index: -1;');
    obj.onload = () => {
      obj.contentDocument.defaultView._parentNode_ = el;
      obj.contentDocument.defaultView.addEventListener('resize', self._handleResize.bind(this));
    };
    obj.type = 'text/html';
    el.appendChild(obj);
    obj.data = 'about:blank';
    return obj;
  };
  _addListener(el, handler, context) {
    const { listener } = this._findPrevListener(el);
    if (listener) {
      const handlers = listener.handlers;
      if (handlers) {
        const size = handlers.length;
        // 判断已经有相同的handler就禁止再添加
        for (let i = 0, h; i < size; i++) {
          h = handlers[i];
          handler = h.handler;
          if (h.context === context && h.handler === handler) {
            return;
          }
        }
      }
      listener.handlers.push({
        context,
        handler,
      });
    } else {
      const eventObj = this._createResizeListener(el);
      this.listeners.push({
        el,
        eventObj,
        handlers: [{
          context,
          handler,
        }]
      });
    }
  }
  _removeListener(el, listener, index) {
    listener.eventObj.contentDocument.defaultView.removeEventListener('resize', this._handleResize);
    el.removeChild(listener.eventObj);
    this.listeners.splice(index, 1);
  }
  on(el, handler, context) {
    this._addListener(el, handler, context);
    if (getStyle(el, 'position') === 'static') {
      el.style.position = 'relative';
    }
    // 返回清除函数，执行清除监听
    return (el, handler, context) => {
      this.off(el, handler, context);
    };
  };
  off(el, handler, context) {
    const { listener, index } = this._findPrevListener(el);
    const handlers = listener.handlers;
    // 当没有指定清除哪个具体函数， 就是清除当前元素所以监听事件
    if (!handler || !handlers.length) {
      this._removeListener(el, listener, index);
    }
    for (let i = 0, l = handlers.length, item; i < l; i++) {
      item = handlers[i];
      // 保证函数和上下文相同，或者没有上下文
      if (item.handler === handler && (!context || !item.context || item.context === context)) {
        // 如果已经是最后一条数据了，也清除当前元素监听
        if (l < 2) {
          this._removeListener(el, listener, index);
          return;
        }
        handlers.splice(i, 1);
        break;
      }
    }
  };
}

export default Resize.getInstance();
