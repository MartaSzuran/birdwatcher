import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class MyMapShowAllObservationsComponent extends Component {
  @service store;
  @tracked isOpenObservationId = null;
  @tracked map;
  @tracked currentLatBounds = this.startLatBounds;
  @tracked currentLngBounds = this.startLngBounds;
  @tracked startLatBounds;
  @tracked startLngBounds;
  @tracked isLoaded = false;

  @action
  saveStartBounds(event) {
    let startBounds = event.map.getBounds();
    this.startLatBounds = [startBounds.vb.lo, startBounds.vb.hi];
    this.startLngBounds = [startBounds.Sa.lo, startBounds.Sa.hi];
    this.isLoaded = true;
  }

  @action
  onBoundsChange(event) {
    let bounds = event.map.getBounds();
    this.currentLatBounds = [bounds.vb.lo, bounds.vb.hi];
    this.currentLngBounds = [bounds.Sa.lo, bounds.Sa.hi];
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
}
