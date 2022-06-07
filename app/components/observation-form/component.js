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
    return !(this.date, this.birdname, this.place, this.notes);
  }
}
