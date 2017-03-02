import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api',
  userData: Ember.inject.service(),

  headers: Ember.computed('userData.token', function () {
    return {
      'API_KEY': this.get('userData.token')
    }
  })
});
