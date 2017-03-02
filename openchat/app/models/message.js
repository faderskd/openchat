import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('String'),
  sentAt: DS.attr('Date'),

  conversation: DS.belongsTo('conversation'),
  sender: DS.belongsTo('user')
});
