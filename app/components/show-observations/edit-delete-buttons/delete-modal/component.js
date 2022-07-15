import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ShowObservationsEditDeleteButtonsDeleteModalComponent extends Component {
  @service store;
  @tracked chosenObservation;

  get currentObservation() {
    return this.args.currentObservation;
  }

  @action
  hideModal() {
    return this.args.hideDeleteModal(false);
  }

  @action
  deleteObservation() {
    console.log(this.currentObservation);
    this.currentObservation.destroyRecord();
  }
}
