/* eslint-disable prettier/prettier */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class ObservationComponent extends Component {
  @tracked dateTo;
  @tracked dateFrom;

  @action
  onDateFromChange(date) {
    this.dateFrom = moment(date).format('YYYY-MM-DD');
    this.args.setFirstDate(this.dateFrom);
  }

  @action
  onDateToChange(date) {
    this.dateTo = moment(date).format('YYYY-MM-DD');
    this.args.setSecondDate(this.dateTo);
  }

  @action 
  clearFields() {
    this.dateTo = null;
    this.dateFrom = null;
    this.args.clearFiltersDates();
  }

}
