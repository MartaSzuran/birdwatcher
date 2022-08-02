import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MyMapAddObservationComponent extends Component {
  @tracked latLocation;
  @tracked lngLocation;

  @action
  onClick(event) {
    this.latLocation = event.googleEvent.latLng.lat();
    this.lngLocation = event.googleEvent.latLng.lng();
    this.args.onLatLocationChange(this.latLocation);
    this.args.onLngLocationChange(this.lngLocation);
  }
}
