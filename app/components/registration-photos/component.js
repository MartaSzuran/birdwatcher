import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RegistrationPhotosComponent extends Component {
  @tracked chosenPhoto;

  @action
  onChosenPhoto(event) {
    this.chosenPhoto = event.target.value;
    this.args.setChosenPhoto(this.chosenPhoto);
  }
}
