import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class MyMapShowAllObservationsObservationOnMapTableComponent extends Component {
  @service store;
  @tracked isOpenObservationId = null;
  @tracked map;
  @tracked latBounds;
  @tracked lngBounds;

  // get currentMapObservations() {
  //   let observations = this.args.observations;
  //   observations = observations.filter((element) => {
  //     if (this.saveBounds) {
  //       // console.log(element);
  //       return this.checkLocation(element);
  //     }
  //   });
  //   return observations;
  // }

  // checkLocation(element) {
  //   if (
  //     element.latLocation >= this.latBounds[0] &&
  //     element.latLocation <= this.latBounds[1] &&
  //     element.lngLocation >= this.lngBounds[0] &&
  //     element.lngLocation <= this.lngBounds[1]
  //   ) {
  //     return element;
  //   }
  // }

  @action
  saveBounds(event) {
    let bounds = event.map.getBounds();
    if (!bounds) {
      console.log('no bounds');
      return null;
    }
    this.latBounds = [bounds.wb.lo, bounds.wb.hi];
    this.lngBounds = [bounds.Ra.lo, bounds.Ra.hi];
    // console.log(this.latBounds);
    // console.log(this.lngBounds);
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
