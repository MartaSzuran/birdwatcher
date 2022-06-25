import Service from '@ember/service';
import { storageFor } from 'ember-local-storage';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class FilterDatesService extends Service {
  @service store;
  @storageFor('filter-dates') filterDates;
  @tracked startDate;
  @tracked endDate;

  setStartDate(date) {
    this.filterDates.set('dateStart', moment(date).format('YYYY-MM-DD'));
    const startDate = this.filterDates.get('dateStart');
    console.log(this.filterDates.get('dateStart'));
  }

  setEndDate(date) {
    this.filterDates.set('dateEnd', moment(date).format('YYYY-MM-DD'));
    const endDate = this.filterDates.get('dateEd');
    console.log(this.filterDates);
  }

  clearDates() {
    this.dateStart = null;
    this.dateEnd = null;
  }
}
