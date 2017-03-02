import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string', {defaultValue: null}),
  token: DS.attr('string', {defaultValue: null}),

  conversations: DS.hasMany('conversation')
});
