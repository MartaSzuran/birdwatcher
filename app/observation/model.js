import Model, { attr, belongsTo } from '@ember-data/model';

export default class ObservationModel extends Model {
  @attr('string') birdname;
  @attr('string') date;
  @attr('string') location;
  @attr('string') notes;

  @belongsTo('user') owner;
}
