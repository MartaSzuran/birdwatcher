import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class ObservationComponent extends Component {
  @service store;
  @tracked dateTo;
  @tracked dateFrom;

  @action
  onDateFromChange(date) {
    this.dateFrom = moment(date).format('YYYY-MM-DD');
    console.log(this.dateFrom);
  }

  @action
  onDateToChange(date) {
    this.dateTo = moment(date).format('YYYY-MM-DD');
    console.log(this.dateTo);
  }

  @action
  async onSave() {
    const dateFrom = this.dateFrom;
    const dateFromModel = this.store.createRecord('dateFrom', dateFrom);
    const dateTo = this.dateTo;
    const dateToModel = this.store.createRecord('dateTo', dateTo);
    await dateFromModel.save();
    await dateToModel.save();
    clearFields();
  }

  clearFields() {
    this.dateFrom = null;
    this.dateTo = null;
  }
}
