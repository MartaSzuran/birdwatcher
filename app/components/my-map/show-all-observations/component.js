import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class MyMapShowAllObservationsComponent extends Component {
  @service store;
  @service session;

  @tracked isOpenObservationId = null;
  @tracked map;
  @tracked currentLatBounds = this.startLatBounds;
  @tracked currentLngBounds = this.startLngBounds;
  @tracked startLatBounds;
  @tracked startLngBounds;
  @tracked isLoaded = false;

  @action
  saveStartBounds(event) {
    const startBounds = event.map.getBounds();
    const { lat, lng } = this.#recomputeCoordinates(startBounds);
    this.startLatBounds = [lat.lo, lat.hi];
    this.startLngBounds = [lng.lo, lng.hi];
    this.isLoaded = true;
  }

  @action
  onBoundsChange(event) {
    let bounds = event.map.getBounds();
    const { lat, lng } = this.#recomputeCoordinates(bounds);
    this.currentLatBounds = [lat.lo, lat.hi];
    this.currentLngBounds = [lng.lo, lng.hi];
  }

  @action
  markerTooltipOpen(observation) {
    if (this.isOpenObservationId) {
      if (this.isOpenObservationId !== observation.get('id')) {
        this.isOpenObservationId = observation.get('id');
        return;
      }
      if (this.isOpenObservationId === observation.get('id')) {
        this.isOpenObservationId = null;
        return;
      }
    }
    this.isOpenObservationId = observation.get('id');
  }

  #recomputeCoordinates(startBounds) {
    const flatten = (obj) => {
      let res = {};
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object') {
          res = { ...res, ...flatten(value) };
        } else {
          res[key] = value;
        }
      }
      return res;
    };

    return Object.entries(startBounds).reduce((acc, [key, value]) => {
      const keyName = key.endsWith('a') ? 'lng' : 'lat';
      return { ...acc, [keyName]: flatten(value) };
    }, {});
  }
}
