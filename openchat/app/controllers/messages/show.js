import Ember from 'ember';

export default Ember.Controller.extend({
  userData: Ember.inject.service(),

  init() {
    this._super(...arguments);
  },

  actions: {
    handleSentMessage(message) {
    }
  }
});
