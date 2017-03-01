import Ember from 'ember';

export default Ember.Component.extend({
  message: '',

  actions: {
    handleMessageSending(m, e) {
      console.log(e);
    }
  }
});
