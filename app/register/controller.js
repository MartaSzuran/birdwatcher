import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class RegisterController extends Controller {
  @service store;
  @service router;
  @tracked chosenPhoto;
  @tracked photo;

  get shouldSaveNewUser() {
    return Boolean(
      this.model.username &&
        this.model.email &&
        this.model.password &&
        this.model.photoURL
    );
  }

  @action
  setChosenPhoto(chosenPhoto) {
    this.photo = chosenPhoto;
    this.model.photoURL = `/assets/images/images-for-user-registration/${this.photo}`;
  }

  @action
  onUsernameChange(event) {
    this.model.username = event.target.value;
  }

  @action
  onEmailChange(event) {
    this.model.email = event.target.value;
  }

  @action
  onPasswordChange(event) {
    this.model.password = event.target.value;
  }

  @action
  onPhotoURLChange(event) {
    this.model.photoURL = event.target.value;
  }

  @action
  async onSubmit(event) {
    if (this.shouldSaveNewUser) {
      event.preventDefault();
      await this.model.save();
      this.router.transitionTo('login');
    }
  }

  @action
  redirectToLoginPage() {
    this.router.transitionTo('login');
  }
}
