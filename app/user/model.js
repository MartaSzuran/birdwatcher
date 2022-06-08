import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') username;
  @attr('string') email;
  @attr('string') info;
  @attr('string') password;
  @attr('string') photoURL;

  @hasMany('observations') observations;
}
