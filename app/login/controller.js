import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Auth0Lock from 'auth0-lock';
const clientId = '90F1Mpg7Z2b7rBNtZx1TEyHAoRQkSBMl';
const domain = 'dev-ows07sv1.us.auth0.com';

export default class LoginController extends Controller {
  @service store;
  @service session;
  @service router;

  @tracked userName;
  @tracked userPassword;

  @action
  onLoginChange(event) {
    this.userName = event.target.value;
  }

  @action
  onPasswordChange(event) {
    this.userPassword = event.target.value;
  }

  @action
  async onSubmit(event) {
    event.preventDefault();
    const { userName, userPassword } = this;
    await this.session.loggedUser(userName, userPassword);
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
