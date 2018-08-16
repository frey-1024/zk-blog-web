import { BASE_DATE_TYPE } from '../../../utils/dateType';
import moment from 'moment';

const DateFormat = Object.create(null);

DateFormat.install = (Vue) => {
  Vue.prototype.$zkDate = {
    formatDate(date, type = BASE_DATE_TYPE) {
      return moment(date).format(type);
    },
    formatDateList(list, itemKey, type = BASE_DATE_TYPE) {
      return list.map((item) => {
        item[itemKey] = this.formatDate(item[itemKey], type);
        return item;
      });
    }
  };
};

export default DateFormat;
