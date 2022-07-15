import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ShowObservationsEditDeleteButtonsComponent extends Component {
  @service session;
  @service store;

  get currentUser() {
    return this.session.currentUser.username;
  }

  get currentObservationOwner() {
    return this.args.observationOwner;
  }

  get checkObservationOwner() {
    return this.currentObservationOwner === this.currentUser;
  }
}
