import Controller from '@ember/controller';
import { tracked } from "@glimmer/tracking";
import { inject as service} from '@ember/service';
import moment from 'moment';
import { action } from '@ember/object';

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

  get filterBetweenDates() {
    let observations = this.model;
    if (this.checkFilterBetweenDates) {
      return observations.filter((observation) => {
        return moment(observation.observationDate).isBetween(this.firstDate, this.secondDate, undefined, '[]');
      });
    };
    return observations;

  }

  @action 
  clearFiltersDates() {
    this.firstDate = null;
    this.secondDate = null;
  }

}