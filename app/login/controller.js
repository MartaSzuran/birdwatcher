import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Auth0Lock from 'auth0-lock';
import ENV from 'birdwatcher/config/environment';

const clientId = ENV.AUTH0_CLIENTID;
const domain = ENV.AUTH0_DOMAIN;

export default class LoginController extends Controller {
  @service store;
  @service session;
  @service router;

  @tracked userName;
  @tracked userPassword;
  @tracked isInvalidUser;

  @action
  onLoginChange({ target: { value } }) {
    this.userName = value;
  }

  @action
  onPasswordChange({ target: { value } }) {
    this.userPassword = value;
  }

  @action
  async onSubmit(event) {
    event.preventDefault();
    const { userName, userPassword } = this;
    await this.session.loggedUser(userName, userPassword);
    this.isInvalidUser = this.session.isInvalidUser;
  }

  @action
  redirectToRegisterRoute() {
    this.router.transitionTo('register');
  }

  @action
  async onAuthLoginOrRegister() {
    const options = { auth: { redirect: false } };
    const lock = new Auth0Lock(clientId, domain, options);
    lock.show({ allowedConnections: ['google-oauth2'] });

    lock.on('authenticated', (authResult) => {
      lock.getUserInfo(authResult.accessToken, async (error, profileResult) => {
        if (error) {
          console.log('error', error);
          return;
        }

        const accessToken = authResult.accessToken;
        const profile = profileResult;

        console.log('success', accessToken, profile);

        await this.session.loginOrRegisterBy0auth(profile);
      });
    });
  }
}
