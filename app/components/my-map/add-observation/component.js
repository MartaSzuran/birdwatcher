import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MyMapComponent extends Component {
  @tracked isOpenLocationId = null;
  @tracked position;

  @action
  markerTooltipOpen(location) {
    if (this.isOpenLocationId) {
      return (this.isOpenLocationId = null);
    }
    this.isOpenLocationId = location.get('id');
  }

  @action
  didLoadMap(event) {
    const myNewmap = event;
    console.log(myNewmap);
  }

  @action
  onClick(event) {
    const myNewEventObj = event;
    console.log(myNewEventObj.googleEvent.xb.x);
  }
}
