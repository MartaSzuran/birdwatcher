import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UserRoute extends Route {
  @service store;

  model() {
    const user = this.store.findRecord('user', 1);
    return user;
  }
}
