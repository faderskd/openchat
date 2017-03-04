import { Factory, association, faker } from 'ember-cli-mirage';

export default Factory.extend({
  username() {
    return faker.internet.userName();
  },
  email() {
    return faker.internet.email();
  },
  token() {
    return faker.random.word();
  },

  password: 'password1234',
});
