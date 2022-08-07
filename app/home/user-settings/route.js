import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeUserSettingsRoute extends Route {
  @service session;

  model() {
    return this.session.currentUser;
  }
}
