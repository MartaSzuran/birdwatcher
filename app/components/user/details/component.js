import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UserDetailsComponent extends Component {
  @service router;

  @action
  transitionToSettingsRoute() {
    this.router.transitionTo('/user-settings');
  }
}
