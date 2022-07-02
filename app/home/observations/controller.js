import HomeUserController from 'birdwatcher/home/user/controller';
import moment from 'moment';

export default class HomeObservationsController extends HomeUserController {

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
}