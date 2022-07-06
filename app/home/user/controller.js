import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import moment from 'moment';

export default class HomeUserController extends Controller {
  @service store;
  @tracked firstDate;
  @tracked secondDate;
  @tracked sortParam;

  queryParams = ['firstDate', 'secondDate', 'sortParam'];

  get checkFilterBetweenDates() {
    return Boolean(this.firstDate && this.secondDate);
  }

  get checkFilterFromDate() {
    return !this.checkFilterBetweenDates && Boolean(this.firstDate);
  }

  get checkFilterToDate() {
    return !this.checkFilterBetweenDates && Boolean(this.secondDate);
  }

  get filteredObservations() {
    let observations = this.model.observations;

    if (this.checkFilterBetweenDates) {
      observations = observations.filter((observation) => {
        return moment(observation.observationDate).isBetween(
          this.firstDate,
          this.secondDate,
          undefined,
          '[]'
        );
      });
      return observations.sortBy('convertToMiliseconds');
    }

    if (this.checkFilterFromDate) {
      observations = observations.filter((observation) => {
        return moment(observation.observationDate).isSameOrAfter(
          this.firstDate
        );
      });
      return observations.sortBy('convertToMiliseconds');
    }

    if (this.checkFilterToDate) {
      observations = observations.filter((observation) => {
        return moment(observation.observationDate).isSameOrBefore(
          this.secondDate
        );
      });
      return observations.sortBy('convertToMiliseconds');
    }
    return observations.sortBy('convertToMiliseconds');
  }

  get sortByBirdname() {
    let listOfObservations = this.filteredObservations;
    if (this.sortParam === 'ASC') {
      return listOfObservations.sortBy('birdname');
    }
    if (this.sortParam === 'DESC') {
      return listOfObservations.sortBy('birdname').reverse();
    }
    return listOfObservations;
  }

  @action
  setSortParam(sortParam) {
    this.sortParam = sortParam;
  }

  @action
  setFirstDate(date) {
    let newFirstDate = date;
    if (!newFirstDate) {
      return null;
    }
    newFirstDate = moment(newFirstDate).startOf('day');
    this.firstDate = moment(newFirstDate).toDate();
  }

  @action
  setSecondDate(date) {
    let newSecondDate = date;
    if (!newSecondDate) {
      return null;
    }
    newSecondDate = moment(newSecondDate).endOf('day');
    this.secondDate = moment(newSecondDate).toDate();
  }

  @action
  clearFiltersDates() {
    this.firstDate = null;
    this.secondDate = null;
  }
}
