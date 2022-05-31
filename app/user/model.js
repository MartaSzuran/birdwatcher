import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') username;
  @attr('string') email;
  @attr('string') info;
  @attr('string') photoURL;
}
