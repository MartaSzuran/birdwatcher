/* eslint-disable prettier/prettier */
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class FilterService extends Service {
  @tracked startDate;
  @tracked endDate;

  setStartDate(date) {
    this.startDate = moment(date).format('YYYY-MM-DD');
    console.log(this.startDate);
  }

  setEndDate(date) {
    this.endDate = moment(date).format('YYYY-MM-DD');
    console.log(this.endDate);
  }

  clearDates() {
    this.dateStart = null;
    this.dateEnd = null;
  }
}
