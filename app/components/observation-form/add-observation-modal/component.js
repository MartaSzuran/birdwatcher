import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ObservationFormAddObservationModalComponent extends Component {
  @action
  transitionToUserProfile() {
    window.location.href = '/user';
  }

  @action
  stayOnAddObservationSide() {
    return this.args.hideAddObservationModal(false);
  }
}
