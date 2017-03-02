import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this._super(...arguments);
    this.messages = [];
    this.get('store').findAll('message').then((data) => {
      this.set('messages', data)
    });
  },

  actions: {
    handleSentMessage(message) {
      this.get('store').createRecord('message', {

      });
    }
  }
});
