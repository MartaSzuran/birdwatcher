import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ObservationsRoute extends Route {
  @service store;

  model() {
    const observations = this.store.findAll('observation');
    return observations;
  }
}
