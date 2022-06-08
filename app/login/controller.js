import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class LoginController extends Controller {
  @action
  onLoginChange() {
    console.log('login change');
  }

  @action
  onPasswordChange() {
    console.log('password change');
  }

  @action
  onSubmit() {
    console.log('submit change');
  }
}
