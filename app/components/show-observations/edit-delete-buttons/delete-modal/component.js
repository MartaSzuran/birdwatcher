import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ShowObservationsEditDeleteButtonsDeleteModalComponent extends Component {
  @action
  hideModal() {
    return this.args.hideDeleteModal(false);
  }
}
