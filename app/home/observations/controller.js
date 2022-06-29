import Controller from '@ember/controller';
import { tracked } from "@glimmer/tracking";
import { inject as service} from '@ember/service';
import moment from 'moment';
import { action } from '@ember/object';
import { sort } from '@ember/object/computed';

export default class HomeObservationsController extends Controller {
  @service store;
  @tracked firstDate;
  @tracked secondDate;
  
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

  get filteredDates() {
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

  @action
  sortByBirdname(sortParam) {
    if (sortParam === 'ASC') {
      // console.log('mam cie');
    }

    if (sortParam === 'DESC') {
      // console.log('mam ciebie też');
    }
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