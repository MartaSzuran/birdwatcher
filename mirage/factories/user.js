import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  username: faker.name.firstName(),
  email: faker.internet.email(),
  info: faker.lorem.paragraph(),
  password: faker.internet.password(),
  photoURL: faker.image.people(),
});
