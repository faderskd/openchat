import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('String'),
  sentAt: DS.attr('Date'),
  sender: DS.belongsTo('user'),
  receiver: DS.belongsTo('user')
});
