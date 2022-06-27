import Controller from '@ember/controller';
import { tracked } from "@glimmer/tracking";
import { inject as service} from '@ember/service';
import moment from 'moment';

export default class ObservationsController extends Controller{
  @service filter;
  @service store;
  @tracked firstDate;
  @tracked secondDate;
  
  queryParams = ['firstDate', 'secondDate'];

  get checkFilterBetweenDates() {
    return Boolean(this.filter.startDate && this.filter.endDate);
  }
  
  get checkFilterFromDate() {
    return !(this.checkFilterBetweenDates) && Boolean(this.filter.startDate);
  }
  
  get checkFilterToDate() {
    return !(this.checkFilterBetweenDates) && Boolean(this.filter.endDate);
  }
  
  get getFirstDateToFilter () {
    this.firstDate = this.filter.startDate;
    return this.firstDate;
  }

  get getSecondDateToFilter () {
    this.secondDate = this.filter.endDate;
    return this.secondDate;
  }

  get setFirstDate() {
    if (!this.firstDate) {
      return null;
    }
    return moment(this.firstDate).toDate();
  }

  get setSecondDate() {
    if (!this.secondDate) {
      return null;
    }
    return moment(this.secondDate).toDate();
  }

  get filterBetweenDates() {
    let observations = this.model;
    if (this.checkFilterBetweenDates) {
      return observations.filter((observation) => {
        return moment(observation.observationDate).isBetween(this.setFirstDate, this.setSecondDate, undefined, '[]');
      });
    };
    return observations;
  }

}