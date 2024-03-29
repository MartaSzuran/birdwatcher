import EmberRouter from '@ember/routing/router';
import config from 'birdwatcher/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home', { path: '/' }, function () {
    this.route('user');
    this.route('add-observation');
    this.route('edit-observation', { path: 'edit-observation/:id' });
    this.route('observations');
    this.route('user-settings');
  });
  this.route('register');
  this.route('login');
});
