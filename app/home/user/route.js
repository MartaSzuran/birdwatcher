/* eslint-disable prettier/prettier */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UserRoute extends Route {
  @service store;
  @service session;

  model() {
    const user = this.session.currentUser;
    return user;
  }
}
