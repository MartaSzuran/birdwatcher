import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class MyMapShowAllObservationsComponent extends Component {
  @service store;
  @tracked isOpenObservationId = null;

  @action
  markerTooltipOpen(observation) {
    if (this.isOpenObservationId) {
      return (this.isOpenObservationId = null);
    }
    this.isOpenObservationId = observation.get('id');
  }
}
