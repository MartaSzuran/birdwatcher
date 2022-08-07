import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import birdList from 'birdwatcher/utils/bird-list';
import moment from 'moment';

export default class ObservationFormComponent extends Component {
  @service session;
  @service store;
  @service router;

  @tracked birdname = '';
  @tracked obserDate;
  @tracked latLocation;
  @tracked lngLocation;
  @tracked locations = '';
  @tracked notes = '';
  @tracked isShowMapModal = false;
  @tracked isShowAddObservationModal = false;
  @tracked currentDay;

  birdList = birdList;

  constructor() {
    super(...arguments);
    this.currentDay = new Date();
  }

  get isEmptyField() {
    return !(
      this.obserDate &&
      this.birdname &&
      this.latLocation &&
      this.lngLocation
    );
  }

  @action
  location() {
    if (this.latLocation && this.lngLocation) {
      this.hideMapModal();
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
    this.isShowAddObservationModal = true;
    this.clear();
  }

  @action
  showMapModal() {
    this.isShowMapModal = true;
  }

  @action
  hideMapModal() {
    if (this.latLocation && this.lngLocation) {
      this.isShowMapModal = false;
      return;
    }
    this.isShowMapModal = false;
  }

  @action
  hideAddObservationModal(booleanInformation) {
    this.isShowAddObservationModal = booleanInformation;
  }

  @action
  onCancel() {
    this.router.transitionTo('/user');
  }

  @action
  clear() {
    this.obserDate = null;
    this.birdname = '';
    this.locations = '';
    this.notes = '';
  }
}
