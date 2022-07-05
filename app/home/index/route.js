/* eslint-disable prettier/prettier */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;

  model() {
    const observations = this.store.findAll('observation');
    return observations;
  }
}
