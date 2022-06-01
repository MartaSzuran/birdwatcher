import Model, { attr } from '@ember-data/model';

export default class ObservationModel extends Model {
  @attr('string') birdname;
  @attr('string') place;
  @attr('string') date;
  @attr('string') notes;
}
