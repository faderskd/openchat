import Ember from 'ember';

export default Ember.Controller.extend({
  userData: Ember.inject.service(),

  actions: {
    handleSentMessage(message) {
      let conversation = this.get('model').currentConversation;
      let username = this.get('userData').username;
      this.get('store').query('user', {filter:{username: username}}).then((user) => {
        console.log(user);
        let newMessage = this.get('store').createRecord('message', {
          content: message,
          conversation: conversation,
          sender: user,
          sentAt: new Date()
        });
        newMessage.save();
      });
    }
  }
});
