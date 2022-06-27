/* eslint-disable prettier/prettier */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class ObservationComponent extends Component {
  @service filter;
  @tracked dateTo;
  @tracked dateFrom;

  @action
  onDateFromChange(date) {
    this.dateFrom = moment(date).format('YYYY-MM-DD');
  }

  @action
  onDateToChange(date) {
    this.dateTo = moment(date).format('YYYY-MM-DD');
  }

  @action
  async onSearch() {
    await this.filter.setStartDate(this.dateFrom);
    await this.filter.setEndDate(this.dateTo);
    this.clearFields();
  }

  clearFields() {
    this.dateFrom = null;
    this.dateTo = null;
  }
}
