import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ObservationFormComponent extends Component {
  @service store;
  @tracked date = '';
  @tracked birdname = '';
  @tracked location = '';
  @tracked notes = '';

  get isEmptyField() {
    return !(this.birdname && this.location && this.notes);
  }

  @action
  onDateChange() {
    this.date = document.getElementById('datepicker');
  }

  @action
  onBirdnameChange(event) {
    this.birdname = event.target.value;
  }

  @action
  onLocationChange(event) {
    this.location = event.target.value;
  }

  @action
  onNotesChange(event) {
    this.notes = event.target.value;
  }

  @action
  async onSave() {
    const observation = {
      date: this.date,
      birdname: this.birdname,
      location: this.location,
      notes: this.notes,
    };

    const observationModel = this.store.createRecord(
      'observation',
      observation
    );
    await observationModel.save();
    this.clear();
  }

  clear() {
    this.date = '';
    this.birdname = '';
    this.location = '';
    this.notes = '';
  }
}
