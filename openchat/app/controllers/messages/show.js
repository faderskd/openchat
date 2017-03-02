import Ember from 'ember';

export default Ember.Controller.extend({
  userData: Ember.inject.service(),

  init() {
    this._super(...arguments);
    console.log(this.get('params'));
  },

  actions: {
    handleSentMessage(message) {
      this.get('store').createRecord('message', {

      });
    }
  }
});
