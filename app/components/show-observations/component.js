/* eslint-disable prettier/prettier */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class ObservationComponent extends Component {
  @service router;

  @tracked dateTo;
  @tracked dateFrom;
  @tracked sort = '';

  get sortArrow() {
    if (!this.sort) {
      return '';
    }
    return this.sort === 'ASC' ? '↓a' : '↑z';
  }

  @action
  sortToggle() {
    if (!this.sort) {
      this.args.sortParam('ASC');
      return (this.sort = 'ASC');
    }

    if (this.sort === 'ASC') {
      this.args.sortParam('DESC');
      return (this.sort = 'DESC');
    }

    if (this.sort === 'DESC') {
      this.args.sortParam('');
      return (this.sort = '');
    }
  }

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

  @action
  redirectToAddObservation() {
    this.router.transitionTo('/add-observation');
  }
}
