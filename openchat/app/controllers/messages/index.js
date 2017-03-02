import Ember from 'ember';

export default Ember.Controller.extend({
  userData: Ember.inject.service(),

  init() {
    this._super(...arguments);
    console.log(this.get('userData'));
    let username = this.get('userData').get('username');
    console.log(username);
    // this.transitionTo(`messages/{#username}`);

    // this.get('store').findAll('message').then((data) => {
    //   this.set('messages', data)
    // });
  },

  // actions: {
  //   handleSentMessage(message) {
  //     this.get('store').createRecord('message', {
  //
  //     });
  //   }
  // }
});
