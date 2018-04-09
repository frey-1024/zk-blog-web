/**
 * Created by zhangkun on 2017/7/2.
 */
import {
  observable,
  action,
} from 'mobx';

class CurrentUser {
  @observable info = 'jjj';

  @action
  setUserInfo = value => {
    this.info = value;
  }
}

export default new CurrentUser();