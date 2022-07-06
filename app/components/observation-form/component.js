/* eslint-disable prettier/prettier */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class ObservationFormComponent extends Component {
  @service session;
  @service store;
  @tracked birdname = '';
  @tracked obserDate;
  @tracked latLocation;
  @tracked lngLocation;
  @tracked locations = '';
  @tracked notes = '';
  @tracked isShowModal = false;

  get isEmptyField() {
    return !(
      this.birdname &&
      this.latLocation &&
      this.lngLocation &&
      this.notes
    );
  }

  @action
  location() {
    if (this.latLocation && this.lngLocation) {
      this.hideModal();
      this.locations = `latitude: ${this.latLocation.toFixed(
        6
      )} / longitude: ${this.lngLocation.toFixed(6)}`;
    }
    return this.locations;
  }

  @action
  onDateChange(date) {
    this.obserDate = moment(date).toDate();
  }

  @action
  onBirdnameChange(event) {
    this.birdname = event.target.value;
  }

  @action
  onLatLocationChange(location) {
    this.latLocation = location;
    this.location();
  }

  @action
  onLngLocationChange(location) {
    this.lngLocation = location;
    this.location();
  }

  @action
  onNotesChange(event) {
    this.notes = event.target.value;
  }

  @action
  async onSave() {
    const observation = {
      observationDate: this.obserDate,
      birdname: this.birdname,
      latLocation: this.latLocation.toFixed(6),
      lngLocation: this.lngLocation.toFixed(6),
      notes: this.notes,
      owner: this.session.currentUser,
    };

    const observationModel = this.store.createRecord(
      'observation',
      observation
    );
    await observationModel.save();
    this.clear();
  }

  @action
  showModal() {
    this.isShowModal = true;
  }

  @action
  hideModal() {
    if (this.latLocation && this.lngLocation) {
      this.isShowModal = false;
    }
  }

  clear() {
    this.obserDate = null;
    this.birdname = '';
    this.locations = '';
    this.notes = '';
  }
}
