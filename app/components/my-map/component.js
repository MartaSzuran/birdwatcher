import Component from "@glimmer/component";
import {action } from '@ember/object';
import {tracked} from '@glimmer/tracking'

export default class MyMapComponent extends Component {
  @tracked isOpenLocationId = null;

  @action 
  markerTooltipOpen(location) {
    if (this.isOpenLocationId) {
      return this.isOpenLocationId = null;
    }
    this.isOpenLocationId = location.get('id');
  }


}