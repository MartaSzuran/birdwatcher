import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class MyMapShowAllObservationsObservationsOnMapTableComponent extends Component {
  @service store;

  get currentMapObservations() {
    let observations = this.args.observations;
    const flteredObservations = observations.filter((observation) => {
      return this.checkLocation(
        observation,
        this.args.currentLatBounds,
        this.args.currentLngBounds
      );
    });
    return flteredObservations;
  }

  checkLocation(observation, latBounds, lngBounds) {
    if (
      observation.latLocation >= latBounds[0] &&
      observation.latLocation <= latBounds[1] &&
      observation.lngLocation >= lngBounds[0] &&
      observation.lngLocation <= lngBounds[1]
    ) {
      return observation;
    }
  }
}
