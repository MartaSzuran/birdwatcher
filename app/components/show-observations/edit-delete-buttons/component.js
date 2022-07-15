import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ShowObservationsEditDeleteButtonsComponent extends Component {
  @service session;
  @service store;
  @tracked isShowModal = false;

  get currentUser() {
    return this.session.currentUser.username;
  }

  get currentObservation() {
    return this.args.currentObservation;
  }

  get currentObservationOwner() {
    return this.args.observationOwner;
  }

  get checkObservationOwner() {
    return this.currentObservationOwner === this.currentUser;
  }

  @action
  showDeleteModal() {
    this.isShowModal = true;
  }

  @action
  hideDeleteModal(information) {
    this.isShowModal = information;
  }

  @action
  editObservation() {
    window.location.href = '/edit-observation';
  }
}
