/* eslint-disable prettier/prettier */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;

  model() {
    const locations = this.store.findAll('location');
    return locations;
  }
}
