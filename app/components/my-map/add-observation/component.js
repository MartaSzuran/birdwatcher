import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MyMapAddObservationComponent extends Component {
  @tracked isOpenLocationId = null;
  @tracked position;
  @tracked latLocation;
  @tracked lngLocation;

  @action
  markerTooltipOpen(location) {
    if (this.isOpenLocationId) {
      return (this.isOpenLocationId = null);
    }
    this.isOpenLocationId = location.get('id');
  }

  @action
  onClick(event) {
    this.latLocation = event.googleEvent.latLng.lat();
    this.lngLocation = event.googleEvent.latLng.lng();
    this.args.onLatLocationChange(this.latLocation);
    this.args.onLngLocationChange(this.lngLocation);
  }
}
