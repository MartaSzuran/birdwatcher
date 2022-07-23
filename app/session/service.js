import Service from '@ember/service';
import { storageFor } from 'ember-local-storage';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SessionService extends Service {
  @service store;
  @storageFor('logged-as') loggedAs;
  @tracked currentUser;

  get isUserLoggedIn() {
    return Boolean(this.loggedAs.get('id'));
  }

  async loggedUser(username, password) {
    const users = await this.store.query('user', {
      filter: { username: username, password: password },
    });
    const validUser = !!users.length;
    if (validUser) {
      const user = users.firstObject;
      this.loggedAs.set('id', user.id);
      window.location.href = '/';
    }
  }

  logoutUser() {
    this.loggedAs.set('id', null);
  }

  async setCurrentUser() {
    const userId = this.loggedAs.get('id');
    const user = await this.store.findRecord('user', userId);
    this.currentUser = user;
  }
}
