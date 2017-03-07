import Ember from 'ember';

export default Ember.Controller.extend({
  userData: Ember.inject.service(),

  init() {
    this._super(...arguments);
  },

  actions: {
    handleSentMessage(message) {
      this.get('store').createRecord('message', {
        content: message,
        sentAt: new Date(),
        conversation: this.model.conversation,
        sender: this.model.currentUser
      }).save();
    }
  }
});
