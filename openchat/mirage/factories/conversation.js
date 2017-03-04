import { Factory, association, faker } from 'ember-cli-mirage';

export default Factory.extend({
  updatedAt() {
    return new Date();
  }
});
