import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class HomeUserSettingsController extends Controller {
  @service store;
  @service router;
  @tracked photo;

  @action
  onPropertyChange(propName, { target: { value } }) {
    this.model[propName] = value;
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
