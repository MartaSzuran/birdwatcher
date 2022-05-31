import EmberRouter from '@ember/routing/router';
import config from 'birdwatcher/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('/');
  this.route('user');
  this.route('observation');
  this.route('observations');
});
