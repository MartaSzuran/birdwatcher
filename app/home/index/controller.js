import Controller from '@ember/controller';
import { tracked } from "@glimmer/tracking";
import { inject as service} from '@ember/service';
import { action } from '@ember/object';

export default class HomeIndexController extends Controller {
  @service store;
  @tracked showInfoWin;

  @action 
  toggleInfoWindow() {
    if (this.showInfoWin) {
      this.showInfoWin = False;
    }
    if (!this.showInfoWin) {
      this.showInfoWin = True;
    }
  }

}