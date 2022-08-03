import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class HomeUserSettingsController extends Controller {
  @service store;
  @service router;

  @tracked username;
  @tracked email;
  @tracked info;
  @tracked password;
  @tracked photoURL;
  @tracked photo = this.model.photoURL;

  @action
  onUsernameChange({ target: { value } }) {
    this.model.username = value;
  }

  @action
  onEmailChange({ target: { value } }) {
    this.model.email = value;
  }

  @action
  onInfoChange({ target: { value } }) {
    this.model.info = value;
  }

  @action
  onPasswordChange({ target: { value } }) {
    this.model.password = value;
  }

  @action
  onPhotoURLChange({ target: { value } }) {
    this.model.photoURL = value;
  }

  @action
  setChosenPhoto(chosenPhoto) {
    this.photo = chosenPhoto;
    this.model.photoURL = `/assets/images/images-for-user-registration/${this.photo}`;
  }

  @action
  onCancel() {
    this.model.rollbackAttributes();
    this.router.transitionTo('/user');
  }

  @action
  async onSave(event) {
    event.preventDefault();
    await this.model.save();
    this.router.transitionTo('/user');
  }
}
