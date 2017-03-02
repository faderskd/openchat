import DS from 'ember-data';

export default DS.Model.extend({
  users: DS.hasMany('user'),
  messages: DS.hasMany('message'),
  updatedAt: DS.attr('date')
});
