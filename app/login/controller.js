import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

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
}
