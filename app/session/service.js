import Service from '@ember/service';
import { storageFor } from 'ember-local-storage';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

const defaultCoordinates = {
  lat: '49.668437',
  lng: '19.189728',
};

export default class SessionService extends Service {
  @service store;
  @storageFor('logged-as') loggedAs;

  @tracked currentUser;
  @tracked _lng;
  @tracked _lat;

  get isUserLoggedIn() {
    return Boolean(this.loggedAs.get('id'));
  }

  get userCoordinates() {
    return {
      lat: this._lat || defaultCoordinates.lat,
      lng: this._lng || defaultCoordinates.lng,
    };
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
    this.setUserCoordinates();
  }

  async loginOrRegisterBy0auth({ username, email, photoURL }) {
    const password = '';
    const users = await this.store.query('user', {
      filter: { email },
    });
    let user = users.firstObject;
    if (!user) {
      user = await this.store
        .createRecord('user', {
          username,
          password,
          email,
          photoURL,
        })
        .save();
    }

    this.loggedAs.set('id', user.id);
    window.location.href = '/';
  }

  setUserCoordinates() {
    if (this._lat && this._lng) {
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this._lat = latitude;
        this._lng = longitude;
      }
    );
  }
}
