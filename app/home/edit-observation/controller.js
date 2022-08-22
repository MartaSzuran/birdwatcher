import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class HomeEditObservationController extends Controller {
  @service store;
  @service router;

  @tracked isShowMapModal = false;

  get currentLocations() {
    return `latitude: ${this.model.latLocation.toFixed(
      6
    )} / longitude: ${this.model.lngLocation.toFixed(6)}`;
  }

  @action
  onPropertyChange(propName, { target: { value } }) {
    this.model[propName] = value;
  }

  @action
  onDateChange(date) {
    this.model.observationDate = moment(date).toDate();
  }

  @action
  showMapModal() {
    this.isShowMapModal = true;
  }

  @action
  onLatLocationChange(newLocation) {
    this.model.latLocation = newLocation;
    this.isShowMapModal = false;
  }

  @action
  onLngLocationChange(newLocation) {
    this.model.lngLocation = newLocation;
    this.isShowMapModal = false;
  }

  @action
  async onSave(event) {
    event.preventDefault();
    await this.model.save();
    this.router.transitionTo('/user');
  }

  @action
  onCancel() {
    this.model.rollbackAttributes();
    this.router.transitionTo('/user');
  }
}
