/* eslint-disable prettier/prettier */
import Model, { attr, belongsTo } from '@ember-data/model';
import moment from 'moment';

export default class ObservationModel extends Model {
  @attr('string') birdname;
  @attr('date', { defaultValue: () => moment().format('YYYY-MM-DD') })
  observationDate;
  @attr('number') latLocation;
  @attr('number') lngLocation;
  @attr('string') notes;

  @belongsTo('user') owner;

  get convertToMiliseconds() {
    return new Date(this.observationDate).getTime();
  }
}
