import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class ObservationComponent extends Component {
  @service filterDates;
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
    await this.filterDates.setStartDate(this.dateFrom);
    await this.filterDates.setEndDate(this.dateTo);
    this.clearFields();
  }

  clearFields() {
    this.dateFrom = null;
    this.dateTo = null;
  }
}
