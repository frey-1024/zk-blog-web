import moment from 'moment';
import Template from './Template.vue';
const DatePicker = Object.create(null);

DatePicker.install = (Vue, options = {}) => {
  let opt = null;
  let vm = null;
  Vue.prototype.$zkDatePicker = (data = {}) => {
    // 合并参数
    opt = Object.assign({
      minDate: '1970-01-01',
      maxDate: '2020-12-31',
      date: moment().format('YYYY-MM-DD')
    }, options, data);
    if (!vm) {
      const tpl = Vue.extend(Template);
      // 实例化， Vue挂载目标
      vm = new tpl();
      // 添加DOM
      document.body.appendChild(vm.$mount().$el);
      return vm.open(opt);
    }
    vm.options = opt;
    return vm.open(opt);
  };
};

export default DatePicker;
