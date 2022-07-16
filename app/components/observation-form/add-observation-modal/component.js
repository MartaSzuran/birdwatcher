import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ObservationFormAddObservationModalComponent extends Component {
  @service router;

  @action
  redirectToUserProfile() {
    this.router.transitionTo('/user');
  }

  @action
  stayOnAddObservationSide() {
    return this.args.hideAddObservationModal(false);
  }
}
