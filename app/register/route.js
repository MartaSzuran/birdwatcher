import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class RegisterRoute extends Route {
  @service store;
  @service session;
  @service router;

  beforeModel() {
    const { isUserLoggedIn } = this.session;
    if (isUserLoggedIn) {
      this.router.transitionTo('home');
      return;
    }
  }

  model() {
    return this.store.createRecord('user');
  }
}
