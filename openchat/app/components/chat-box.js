import Ember from 'ember';

export default Ember.Component.extend({
  message: '',
  messages: null,

  actions: {
    enterPressedOnMessageInput() {
      this.get('onSentMessage')(this.get('message'));
    }
  }
});
