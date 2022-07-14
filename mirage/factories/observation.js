import { Factory } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  birdname() {
    return faker.animal.bird();
  },
  observationDate() {
    return faker.date.past();
  },
  latLocation() {
    return faker.datatype.float();
  },
  lngLocation() {
    return faker.datatype.float();
  },
  notes() {
    return faker.lorem.paragraph();
  },
});
