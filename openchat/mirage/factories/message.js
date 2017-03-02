import { Factory, faker, association } from 'ember-cli-mirage';

export default Factory.extend({
  content: 'super wiadomosc',
  sentAt() {
    return faker.date.past();
  },

  conversation: association(),
  sender: association()
});
