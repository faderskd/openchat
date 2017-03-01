import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  sender: belongsTo('user'),
  receiver: belongsTo('user')
});
