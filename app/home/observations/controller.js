import Controller from '@ember/controller';
import { tracked } from "@glimmer/tracking";
import { inject as service} from '@ember/service';
import moment from 'moment';
import { action } from '@ember/object';

export default class HomeObservationsController extends Controller {
  @service store;
  @tracked firstDate;
  @tracked secondDate;
  @tracked sortParam;
  
  queryParams = ['firstDate', 'secondDate'];

  constructor() {
    super(...arguments);
  }

  get checkFilterBetweenDates() {
    return Boolean(this.firstDate && this.secondDate);
  }
  
  get checkFilterFromDate() {
    return !(this.checkFilterBetweenDates) && Boolean(this.firstDate);
  }
  
  get checkFilterToDate() {
    return !(this.checkFilterBetweenDates) && Boolean(this.secondDate);
  }

  get filteredObservations() {
    let observations = this.model;

    if (this.checkFilterBetweenDates) {
      return observations.filter((observation) => {
        return moment(observation.observationDate).isBetween(this.firstDate, this.secondDate, undefined, '[]');
      });
    };

    if (this.checkFilterFromDate) {
      return observations.filter((observation) => {
        return moment(observation.observationDate).isSameOrAfter(this.firstDate);
      })
    }

    if (this.checkFilterToDate) {
      return observations.filter((observation) => {
        return moment(observation.observationDate).isSameOrBefore(this.secondDate);
      })
    }
    return observations;

  }

  get sortByBirdname () {
    if (this.sortParam === 'ASC') {
      return this.filteredObservations.sortBy('birdname');
    }
    if (this.sortParam === 'DESC') {
      return this.filteredObservations.sortBy('birdname').reverse();
    }
    return this.filteredObservations;
  }

  @action
  setSortParam(sortParam) {
    this.sortParam = sortParam;
  }
  
  @action 
  setFirstDate(date) {
    const newFirstDate = date;
    if (!newFirstDate) {
      return null;
    }
    this.firstDate = moment(newFirstDate).toDate();
  }

  @action 
  setSecondDate(date) {
    const newSecondDate = date;
    if (!newSecondDate) {
      return null;
    }
    this.secondDate = moment(newSecondDate).toDate();
  }

  @action 
  clearFiltersDates() {
    this.firstDate = null;
    this.secondDate = null;
  }

}