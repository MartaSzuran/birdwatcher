import HomeUserController from 'birdwatcher/home/user/controller';
import moment from 'moment';

export default class HomeObservationsController extends HomeUserController {
  get filteredObservations() {
    let observations = this.model;

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
}
