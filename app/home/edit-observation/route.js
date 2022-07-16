import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class EditObsrvationRoute extends Route {
  @service store;

  model(params) {
    console.log('fetchuje model');
    return this.store.findRecord('observation', params.id);
  }
}
