import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ObservationFormComponent extends Component {
  @service store;
  @tracked date = '';
  @tracked birdname = '';
  @tracked place = '';
  @tracked notes = '';

  get isEmptyField() {
    return !(this.birdname, this.place, this.notes);
  }

  @action
  onDateChange() {
    this.date = document.getElementById('datepicker');
    console.log(this.date);
  }

  @action
  onBirdnameChange(event) {
    this.birdname = event.target.value;
    console.log(this.birdname);
  }

  @action
  onPlaceChange(event) {
    this.place = event.target.value;
    console.log(this.place);
  }

  @action
  onNotesChange(event) {
    this.notes = event.target.value;
    console.log(this.notes);
  }

  @action
  async onSave() {
    const observation = {
      date: this.date,
      birdname: this.birdname,
      place: this.place,
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
    this.place = '';
    this.notes = '';
  }
}
