import Ember from 'ember';

export default Ember.Controller.extend({
  userData: Ember.inject.service(),

  actions: {
    handleSentMessage(message) {
      let conversation = this.get('model').currentConversation;
      let loggedInUserId = this.get('userData').id;
      let user = this.get('store').peekRecord('user', loggedInUserId);
      let newMessage = this.get('store').createRecord('message', {
        content: message,
        conversation: conversation,
        sender: user,
        sentAt: new Date()
      });

      newMessage.save();
    }
  }
});
