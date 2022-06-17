import Model, { attr, belongsTo } from '@ember-data/model';
import moment from 'moment';

export default class ObservationModel extends Model {
  @attr('string') birdname;
  @attr('date', { defaultValue: () => moment().format('YYYY-MM-DD') })
  date;
  @attr('string') location;
  @attr('string') notes;

  @belongsTo('user') owner;
}
