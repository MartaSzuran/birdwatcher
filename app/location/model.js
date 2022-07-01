import Model, { attr, belongsTo } from '@ember-data/model';

export default class LocationModel extends Model {
  @attr('string') lat;
  @attr('string') lng;

  @belongsTo('observation', { autoSave: true }) observation;
}