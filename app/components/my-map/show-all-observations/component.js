/* eslint-disable prettier/prettier */
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
  async saveStartBounds(event) {
    let startBounds = await event.map.getBounds();
    this.startLatBounds = [startBounds.wb.lo, startBounds.wb.hi];
    this.startLngBounds = [startBounds.Ra.lo, startBounds.Ra.hi];
    this.isLoaded = true;
  }

  @action
  async onBoundsChange(event) {
    let bounds = await event.map.getBounds();
    this.currentLatBounds = [bounds.wb.lo, bounds.wb.hi];
    this.currentLngBounds = [bounds.Ra.lo, bounds.Ra.hi];
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
